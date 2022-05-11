const express = require('express');

//import apollo 
const { ApolloServer } = require('apollo-server-express');

//import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

//create a new apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//create a new instance of an apollo server with the graphql schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  server.applyMiddleware({ app });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

//call the aysnc function to start the server 
startApolloServer(typeDefs, resolvers);
