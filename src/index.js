require("dotenv").config();
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

const PRISMA_SECRET = process.env.PRISMA_SECRET;

let links = [{
    id: 'link-0',
    url: 'www.google.com',
    description: 'Search engine'
}];

let idCount = links.length;
const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'https://us1.prisma.sh/public-orchidweed-205/hackernews-node/dev',
          secret: PRISMA_SECRET,
          debug: false,
        }),
      }),
});

server.start(() => console.log(`Server is running on http://localhost:4000`));