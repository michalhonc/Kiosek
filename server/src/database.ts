import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { User } from './models/user.model';
import { Snack } from './models/snack.model';
import { Transaction } from './models/transaction.model';

dotenv.config();

mongoose.connect(process.env.DB_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (e) => console.error('connection error:', e));

export {
    db,
    User,
    Snack,
    Transaction,
};
