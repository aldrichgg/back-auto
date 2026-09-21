import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { AssetsModule } from '@modules/assets/assets.module';
import { PortfolioModule } from '@modules/portfolio/portfolio.module';
import { MarketplaceModule } from '@modules/marketplace/marketplace.module';
import { TradingModule } from '@modules/trading/trading.module';
import { PaymentsModule } from '@modules/payments/payments.module';
import { ConciergeModule } from '@modules/concierge/concierge.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { ComplianceModule } from '@modules/compliance/compliance.module';
import { AdminModule } from '@modules/admin/admin.module';
import { HealthModule } from '@modules/health/health.module';

import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import jwtConfig from '@config/jwt.config';
import redisConfig from '@config/redis.config';
import awsConfig from '@config/aws.config';

@Module({
  imports: [
    // ── Configuration ──────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig, jwtConfig, redisConfig, awsConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // ── Database ───────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        migrations: [join(__dirname, 'database/migrations', '*.{ts,js}')],
        synchronize: config.get<boolean>('DB_SYNC', false),
        logging: config.get<boolean>('DB_LOGGING', false),
        ...(config.get('DB_SSL') === 'true'
          ? { ssl: { rejectUnauthorized: false } }
          : {}),
      }),
    }),

    // ── Rate Limiting ──────────────────────────────────────
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'global',
            ttl: config.get<number>('THROTTLE_TTL', 60000),
            limit: config.get<number>('THROTTLE_LIMIT', 100),
          },
        ],
      }),
    }),

    // ── Queue (BullMQ via Redis) ───────────────────────────
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const password = config.get<string>('REDIS_PASSWORD');
        return {
          redis: {
            host: config.get<string>('REDIS_HOST', 'localhost'),
            port: config.get<number>('REDIS_PORT', 6379),
            ...(password ? { password } : {}),
            db: config.get<number>('REDIS_DB', 0),
          },
        } as any;
      },
    }),

    // ── Scheduled Tasks ────────────────────────────────────
    ScheduleModule.forRoot(),

    // ── GraphQL ────────────────────────────────────────────
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      context: ({ req, res }: { req: any; res: any }) => ({ req, res }),
    }),

    // ── Feature Modules ────────────────────────────────────
    HealthModule,
    AuthModule,
    UsersModule,
    AssetsModule,
    PortfolioModule,
    MarketplaceModule,
    TradingModule,
    PaymentsModule,
    ConciergeModule,
    NotificationsModule,
    ComplianceModule,
    AdminModule,
  ],
})
export class AppModule {}
