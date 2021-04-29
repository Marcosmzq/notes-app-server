const userResolvers = require("./users");
const userNotes = require("./notes");

module.exports = {
  Query: {
    sayHi: () => "Hi world!",
    ...userNotes.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userNotes.Mutation,
    ...userResolvers.Mutation,
  },
};
