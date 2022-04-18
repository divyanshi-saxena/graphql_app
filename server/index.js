const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");
// every query we define will exist in typeDef
// all functions that resolve that query like making calls to APIs, send data back, etc
// will be enclosed inside a variable called resolvers
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Your API is running at ${url}`);
});
