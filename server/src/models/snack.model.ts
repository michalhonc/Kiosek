import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const snackSchema = new Schema({
    name:  String,
});

export const Snack = mongoose.model('Snack', snackSchema);
