const bcrypt = require('bcryptjs');

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
                token: 'token',
            };
        },

        signIn: async (_root, { input }, { db }) => {
            // Check if user is correct
            const user = await db
                .collection('users')
                .findOne({ email: input.email });
            if (!user) {
                throw new Error('Invalid credential!');
            }

            // Check if password is correct
            const isPasswordCorrect = bcrypt.compareSync(
                input.password,
                user.password,
            );
            if (!isPasswordCorrect) {
                throw new Error('Invalid credential!');
            }

            return {
                user,
                token: 'token',
            };
        },
    },

    // Transformation id to _id and vice versa
    User: {
        id: ({ _id, id }) => _id || id,
    },
};
