import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'apex_user',
  pass: process.env.DB_PASS || 'apex_password_dev',
  name: process.env.DB_NAME || 'autoequity_dev',
  sync: process.env.DB_SYNC === 'true',
  logging: process.env.DB_LOGGING === 'true',
}));
