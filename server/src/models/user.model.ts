import { gql } from 'apollo-server';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:  String,
    email: String,
    imgId: String,
    dept: Number,
});

export const User = mongoose.model('User', userSchema);

export const typeDefs = gql`
    type User {
        id: ID
        name: String
        email: String
        imgId: String
        dept: Int
    }

    type Query {
        users: [User]
        user: User
    }

    type Mutation {
        addUser(name: String, email: String): User
        deleteUser(id: String): String
    }
`;

export const resolvers = {
    Query: {
        users: async () => await User.find({}),
        // @ts-ignore
        user: async (_, { id }) => {
            // @ts-ignore
            const result = await User.findById(id);
            return result;
        },
    },
    Mutation: {
        // @ts-ignore
        addUser: async (_, { name, email, dept }) => {
            const user = new User({
                name,
                email,
                imgId: Buffer.from(email).toString('base64'),
                dept,
            });
            await user.save();
            return user;
        },
        // @ts-ignore
        deleteUser: async (_, {id}) => {
            await User.findByIdAndRemove(id);
            return "User deleted";
        }
    }
};
