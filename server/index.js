// Environment
require('dotenv').config();
const { DB_USER, DB_USER_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;
// Apollo
const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql/typeDef');
const { resolvers } = require('./graphql/resolvers');
// MongoDB
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.nvckw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
('mongodb+srv://grafsoul:<password>@cluster0.nvckw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const start = async () => {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db(DB_NAME);
    const context = { db };
    const server = new ApolloServer({ typeDefs, resolvers, context });
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};

start();
