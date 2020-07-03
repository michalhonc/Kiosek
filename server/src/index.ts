import express from 'express';
const app = express();
import cors from 'cors';
import { ApolloServer } from 'apollo-server';

import { typeDefs, resolvers } from './graphql';
import { db } from './database';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
});

db.once('open', () => {
    console.log('DB connected..');
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
});

app.use(cors());

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('hello world');
});

app.listen(4001);
