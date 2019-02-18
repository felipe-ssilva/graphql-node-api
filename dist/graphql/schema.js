"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const users = [
    {
        id: 1,
        name: 'Felipe',
        email: 'felipe@email.com'
    },
    {
        id: 2,
        name: 'Flavia',
        email: 'flavia@email.com'
    }
];
const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        createUser(name: String!, email: String!): User
        deleteUser(id: ID!): User
    }
`;
const resolvers = {
    User: {
        id: (user) => user.id,
        name: (user) => user.name,
        email: (user) => user.email
    },
    Query: {
        allUsers: () => users
    },
    Mutation: {
        createUser: (parent, args) => {
            const newUser = Object.assign({ id: users.length + 1 }, args);
            users.push(newUser);
            return newUser;
        },
        deleteUser: (parent, args) => {
            const removeUser = Object.assign({}, args);
            delete removeUser[args];
            return removeUser;
        }
    }
};
exports.default = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });
