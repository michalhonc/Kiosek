import { gql } from 'apollo-server';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const snackSchema = new Schema({
    name:  String,
    quantity: Number,
    price: Number,
    imgId: String,
    extra: String,
});

export const Snack = mongoose.model('Snack', snackSchema);

export const typeDefs = gql`
    type Snack {
        id: ID
        name: String
        quantity: Int
        price: Int
        imgId: String
        extra: String
    }

    extend type Query {
        snacks: [Snack]
        snack: Snack
    }

    extend type Mutation {
        addSnack(name: String, quantity: Int, price: Int, extra: String): Snack
        editSnackQuantity(id: String, quantity: Int): Snack
        deleteSnack(id: String): String
    }
`;

export const resolvers = {
    Query: {
        snacks: async () => await Snack.find({ quantity: { $ne: 0 } }),
        // @ts-ignore
        snack: async (_, { id }) => {
            // @ts-ignore
            const result = await Snack.findById(id);
            return result;
        },
    },
    Mutation: {
        // @ts-ignore
        addSnack: async (_, { name, quantity, price, extra }) => {
            const snack = new Snack({
                name,
                quantity,
                price,
                imgId: Buffer.from(name).toString('base64'),
                extra,
            });
            await snack.save();
            return snack;
        },
        // @ts-ignore
        editSnackQuantity: async (_, { id, quantity }) => {
            const snack = await Snack.findById(id);
            if (snack) {
                // @ts-ignore
                snack.quantity = quantity;
                await snack.save();
            }
            return snack;
        },
        // @ts-ignore
        deleteSnack: async (_, {id}) => {
            await Snack.findByIdAndRemove(id);
            return "Snack deleted";
        }
    }
};
