// Environment
require('dotenv').config();
const { DB_USER, DB_USER_PASSWORD, DB_CLUSTER, DB_NAME, JWT_SECRET } =
    process.env;
// Apollo
const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql/typeDef');
const { resolvers } = require('./graphql/resolvers');
// MongoDB
const { MongoClient, ObjectID } = require('mongodb');
const uri = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.nvckw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
('mongodb+srv://grafsoul:<password>@cluster0.nvckw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// Encryption
const jwt = require('jsonwebtoken');

const getUserFromToken = async (token, db) => {
    if (!token) {
        return null;
    }

    const tokenData = jwt.verify(token, JWT_SECRET);
    if (!tokenData?.id) {
        return null;
    }

    return await db
        .collection('users')
        .findOne({ _id: ObjectID(tokenData.id) });
};

const start = async () => {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db(DB_NAME);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const user = await getUserFromToken(req.headers.authorization, db);
            return { db, user };
        },
    });
    server.listen({ port: 4000 }).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};

start();
