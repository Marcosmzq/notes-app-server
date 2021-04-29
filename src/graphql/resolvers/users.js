const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

const User = require("../../models/Users");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Los datos ingresados son invalidos.", {
          errors,
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "El usuario ingresado no existe";
        throw new UserInputError("El usuario ingresado no existe", { errors });
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        errors.general = "La contraseña ingresada no es valida";
        throw new UserInputError("La contraseña ingresada no es valida", {
          errors,
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user.id,
        username: user.username,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Los datos ingresados son invalidos.", {
          errors,
        });
      }

      const userEmail = await User.findOne({ email });
      if (userEmail) {
        throw new UserInputError("El email que escribiste ya existe.", {
          errors: {
            email: "El email elegido no está disponible",
          },
        });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("El nombre de usuario ya existe.", {
          errors: {
            username: "El nombre de usuario no está disponible",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        username: res.username,
        token,
      };
    },
  },
};
