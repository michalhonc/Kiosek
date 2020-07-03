import { gql } from 'apollo-server';

import * as user from './models/user.model';
import * as snack from './models/snack.model';

export const typeDefs = gql`
    type Query{
        _empty: String
    }
    type Mutation {
        _empty: String
    }
    ${user.typeDefs}
    ${snack.typeDefs}
`;

export const resolvers = [
    user.resolvers,
    snack.resolvers,
];
