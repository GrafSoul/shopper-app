// Environment
require('dotenv').config();
const { JWT_SECRET } = process.env;

// Encryption
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getToken = (user) =>
    jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' });

exports.resolvers = {
    Query: {
        // Get all lists
        getShopLists: () => [],
    },
    Mutation: {
        signUp: async (_root, { input }, { db }) => {
            // Password encryption
            const hashedPassword = bcrypt.hashSync(input.password);

            const newUser = {
                ...input,
                password: hashedPassword,
            };

            // Add new user
            const result = await db.collection('users').insertOne(newUser);
            const user = result.ops[0];

            return {
                user,
                token: getToken(user),
            };
        },

        signIn: async (_root, { input }, { db }) => {
            const user = await db
                .collection('users')
                .findOne({ email: input.email });

            const isPasswordCorrect =
                user && bcrypt.compareSync(input.password, user.password);

            // Check if user or password is correct
            if (!user || !isPasswordCorrect) {
                throw new Error('Invalid credential!');
            }

            return {
                user,
                token: getToken(user),
            };
        },

        createShopList: async (_root, { title }, { db, user }) => {
            if (!user) throw new Error('Authentication error! Please Sign In.');

            const newShopList = {
                title,
                createdAt: new Date().toISOString(),
                userIds: [user._id],
            };

            const result = await db
                .collection('shop-list')
                .insertOne(newShopList);

            return result.ops[0];
        },
    },

    // Transformation id to _id and vice versa
    User: {
        id: ({ _id, id }) => _id || id,
    },

    ShopList: {
        id: ({ _id, id }) => _id || id,
        progress: () => 0,
        users: async ({ userIds }, _, { db }) =>
            Promise.all(
                userIds.map((userId) =>
                    db.collection('users').findOne({ _id: userId }),
                ),
            ),
    },
};
