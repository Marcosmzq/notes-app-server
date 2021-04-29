const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Note {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Query {
    sayHi: String!
    getUserNotes(userId: ID!): [Note]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createNote(body: String!): Note!
    deleteNote(noteId: ID!): String
    updateNote(noteId: ID!, bodyUpdate: String!): Note!
  }
`;
