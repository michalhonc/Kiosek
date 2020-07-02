import express from 'express';
const app = express();
import { ApolloServer } from 'apollo-server';

import * as user from './models/user.model';
import * as db from './database';

const server = new ApolloServer({
    typeDefs: [user.typeDefs],
    resolvers: [user.resolvers],
    playground: true,
    introspection: true,
});

db.db.once('open', () => {
    console.log('DB connected..');
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('hello world');
});

app.listen(4001);
