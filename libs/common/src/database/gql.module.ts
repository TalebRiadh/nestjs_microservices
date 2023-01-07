import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';



@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        playground: true,

        autoSchemaFile: "schema.gql",
        subscriptions: {
          "graphql-ws": true,
          'subscriptions-transport-ws': true,
        }
      }),
  ],
})
export class GqlModule {}

