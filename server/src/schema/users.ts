import { gql } from 'apollo-server-express';

const usersSchema = gql`
    type User {
        id: ID!
        nickname: String!
    }

    extend type Query {
        users: [User!]!
        user(id: ID!): User
    }
`;

export default usersSchema;
