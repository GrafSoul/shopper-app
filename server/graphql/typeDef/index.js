// Apollo
const { gql } = require('apollo-server');

// Types of data, queries and mutations
exports.typeDefs = gql`
    type Query {
        userShopLists: [ShopList!]!
        getShopList(id: ID!): ShopList!
    }

    type Mutation {
        signUp(input: SignUpInput): AuthUser!
        signIn(input: SignInInput): AuthUser!

        createShopList(title: String!): ShopList!
        updateShopList(id: ID!, title: String!): ShopList!
        deleteShopList(id: ID!): Boolean!

        addUserToShopList(shopListId: ID!, userId: ID!): ShopList!

        createShopToDo(content: String!, shopListId: ID!): ShopToDo!
        updateShopToDo(
            id: ID!
            content: String
            isCompleted: Boolean
        ): ShopToDo!
        deleteShopToDo(id: ID!): Boolean!
    }

    input SignUpInput {
        name: String!
        email: String!
        password: String!
        avatar: String
    }

    input SignInInput {
        email: String!
        password: String!
    }

    type AuthUser {
        user: User!
        token: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String!
    }

    type ShopList {
        id: ID!
        title: String!
        progress: Float!
        createdAt: String!

        users: [User!]!
        shopToDos: [ShopToDo!]!
    }

    type ShopToDo {
        id: ID!
        content: String!
        isCompleted: Boolean!

        shopList: ShopList!
    }
`;
