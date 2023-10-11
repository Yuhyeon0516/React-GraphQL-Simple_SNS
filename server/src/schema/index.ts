import { gql } from 'apollo-server-express';
import messagesSchema from './messages';
import usersSchema from './users';

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

export default [linkSchema, messagesSchema, usersSchema];
