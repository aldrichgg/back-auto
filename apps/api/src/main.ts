import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3000);
  const isProduction = config.get('NODE_ENV') === 'production';

  // ── Security ──────────────────────────────────────────────
  app.use(helmet({ contentSecurityPolicy: isProduction }));
  app.use(compression());

  // ── CORS ──────────────────────────────────────────────────
  const allowedOrigins = config
    .get<string>('CORS_ORIGINS', 'http://localhost:3001')
    .split(',');
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // ── Versioning ────────────────────────────────────────────
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.setGlobalPrefix(config.get<string>('API_PREFIX', 'api/v1'), {
    exclude: ['health', 'graphql'],
  });

  // ── Validation ────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── WebSockets ────────────────────────────────────────────
  app.useWebSocketAdapter(new IoAdapter(app));

  // ── Swagger (apenas em dev/staging) ───────────────────────
  if (config.get<boolean>('SWAGGER_ENABLED', true)) {
    const docConfig = new DocumentBuilder()
      .setTitle('AutoEquity — Apex Capital API')
      .setDescription(
        'Plataforma de investimento fracionado em ativos automotivos de alta performance. CVM 175.',
      )
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'AccessToken',
      )
      .addTag('auth', 'Autenticação e controle de sessão')
      .addTag('users', 'Perfil e gestão de membros')
      .addTag('assets', 'Ativos automotivos e proveniência')
      .addTag('portfolio', 'Portfólio e custódia do investidor')
      .addTag('marketplace', 'Ofertas primárias (IPO)')
      .addTag('trading', 'Mercado secundário de negociação')
      .addTag('payments', 'Depósitos, saques e extrato')
      .addTag('concierge', 'Serviços premium Apex Private')
      .addTag('notifications', 'Notificações push e in-app')
      .addTag('compliance', 'Relatórios regulatórios CVM 175')
      .addTag('admin', 'Backoffice administrativo')
      .build();

    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
  }

  await app.listen(port);
  console.log(`🚀 Apex Capital API running on: http://localhost:${port}`);
  console.log(`📚 Swagger Docs: http://localhost:${port}/docs`);
}

bootstrap();
