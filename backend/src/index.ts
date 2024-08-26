import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import dataSource from "./database/dataSource";
import CountryResolver from "./resolvers/countryResolver";

const startServer = async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });
  
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

startServer();