import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    quantity: String,
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
