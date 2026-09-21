import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
  @Query(() => String, { name: 'ping', description: 'Returns a simple pong to verify the GraphQL server is running.' })
  ping() {
    return 'pong';
  }
}
