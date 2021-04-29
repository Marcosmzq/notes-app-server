const validateRegisterInput = (username, email, password, confirmPassword) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "El nombre de usuario no puede estar vacio.";
  }
  if (email.trim() === "") {
    errors.email = "El email no puede estar vacio.";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) {
      errors.email = "El email ingresado es invalido.";
    }
  }

  if (password === "") {
    errors.password = "La contraseña no puede estar vacia.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas tienen que ser iguales.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "El nombre de usuario no puede estar vacio.";
  }
  if (password.trim() === "") {
    errors.password = "La contraseña no puede estar vacia.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports = {
  validateRegisterInput,
  validateLoginInput,
};
