// Environment
require('dotenv').config();
const { JWT_SECRET } = process.env;

// MongoDB
const { ObjectID } = require('mongodb');

// Encryption
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getToken = (user) =>
    jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' });

exports.resolvers = {
    Query: {
        // Get all lists
        userShopLists: async (_root, _args, { db, user }) => {
            if (!user) throw new Error('Authentication Error! Please Sign In.');
            return await db
                .collection('shop-list')
                .find({ userIds: user._id })
                .toArray();
        },

        getShopList: async (_root, { id }, { db, user }) => {
            if (!user) throw new Error('Authentication Error! Please Sign In.');
            return await db
                .collection('shop-list')
                .findOne({ _id: ObjectID(id) });
        },
    },

    Mutation: {
        // Authentication
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

        // ShopList
        createShopList: async (_root, { title }, { db, user }) => {
            if (!user) throw new Error('Authentication Error! Please Sign In.');

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

        updateShopList: async (_root, { id, title }, { db, user }) => {
            if (!user) throw new Error('Authentication Error. Please sign in');

            await db.collection('shop-list').updateOne(
                {
                    _id: ObjectID(id),
                },
                {
                    $set: {
                        title,
                    },
                },
            );

            return await db
                .collection('shop-list')
                .findOne({ _id: ObjectID(id) });
        },

        deleteShopList: async (_root, { id }, { db, user }) => {
            if (!user) throw new Error('Authentication Error. Please sign in');

            // TODO only collaborators of this task list should be able to delete
            await db.collection('shop-list').removeOne({ _id: ObjectID(id) });

            return true;
        },

        addUserToShopList: async (
            _root,
            { shopListId, userId },
            { db, user },
        ) => {
            if (!user) throw new Error('Authentication Error. Please sign in');

            const shopList = await db
                .collection('shop-list')
                .findOne({ _id: ObjectID(shopListId) });
            if (!shopList) {
                return null;
            }
            if (
                shopList.userIds.find(
                    (dbId) => dbId.toString() === userId.toString(),
                )
            ) {
                return shopList;
            }

            await db.collection('shop-list').updateOne(
                {
                    _id: ObjectID(shopListId),
                },
                {
                    $push: {
                        userIds: ObjectID(userId),
                    },
                },
            );
            shopList.userIds.push(ObjectID(userId));
            return shopList;
        },

        // ShopToDo
        createShopToDo: async (
            _root,
            { content, shopListId },
            { db, user },
        ) => {
            if (!user) {
                throw new Error('Authentication Error. Please sign in');
            }
            const newToDo = {
                content,
                shopListId: ObjectID(shopListId),
                isCompleted: false,
            };
            const result = await db.collection('shop-todo').insertOne(newToDo);

            return result.ops[0];
        },

        updateShopToDo: async (_root, data, { db, user }) => {
            if (!user) {
                throw new Error('Authentication Error. Please sign in');
            }

            const result = await db.collection('shop-todo').updateOne(
                {
                    _id: ObjectID(data.id),
                },
                {
                    $set: data,
                },
            );

            return await db
                .collection('shop-todo')
                .findOne({ _id: ObjectID(data.id) });
        },

        deleteShopToDo: async (_root, { id }, { db, user }) => {
            if (!user) {
                throw new Error('Authentication Error. Please sign in');
            }

            // TODO only collaborators of this task list should be able to delete
            await db.collection('shop-todo').removeOne({ _id: ObjectID(id) });

            return true;
        },
    },

    // Transformation id to _id and vice versa
    User: {
        id: ({ _id, id }) => _id || id,
    },

    ShopList: {
        id: ({ _id, id }) => _id || id,
        progress: async ({ _id }, _, { db }) => {
            const todos = await db
                .collection('shop-todo')
                .find({ shopListId: ObjectID(_id) })
                .toArray();
            const completed = todos.filter((todo) => todo.isCompleted);

            if (todos.length === 0) {
                return 0;
            }

            return (100 * completed.length) / todos.length;
        },
        users: async ({ userIds }, _, { db }) =>
            Promise.all(
                userIds.map((userId) =>
                    db.collection('users').findOne({ _id: userId }),
                ),
            ),
        shopToDos: async ({ _id }, _, { db }) =>
            await db
                .collection('shop-todo')
                .find({ shopListId: ObjectID(_id) })
                .toArray(),
    },

    ShopToDo: {
        id: ({ _id, id }) => _id || id,
        shopList: async ({ shopListId }, _, { db }) =>
            await db
                .collection('shop-list')
                .findOne({ _id: ObjectID(shopListId) }),
    },
};
