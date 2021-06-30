const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { ApolloError } = require('apollo-server-errors');
const { PrismaClient } = require('@prisma/client');
const { PubSub } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');

const prisma = new PrismaClient();
const pubsub = new PubSub();

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');

// 1
let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

// 1
let idCount = links.length;
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

//the listen method launches a web server.
server
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(({ url }) => {
    console.log(` Server ready at ${url} ${__dirname}`);
  });
