const { PrismaClient } = require("@prisma/client");
const { ApolloServer,PubSub } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils");
const Query = require ('./resolvers/Query')
const Link = require ('./resolvers/Link')     
const Mutation = require ('./resolvers/Mutation')
const DateTime = require ('./resolvers/DateTime')
const User = require ('./resolvers/User')
const Vote = require ('./resolvers/Vote')
const Subscription = require ('./resolvers/Subscription')


const prisma = new PrismaClient();

const pubsub = new PubSub();

const resolvers = { Query, Mutation , User , Link, Subscription,Vote,DateTime };

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({req}) =>{
      return {
          ...req,
          prisma,
          pubsub,
          userId: req && req.headers.authorization ? getUserId(req) : null
      };
  }
});
server.listen().then(({ url }) => console.log(`Server Runnig at ${url}`));
