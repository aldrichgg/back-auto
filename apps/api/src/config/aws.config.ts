import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: process.env.AWS_REGION || 'sa-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  buckets: {
    kyc: process.env.S3_BUCKET_KYC || 'apex-kyc-documents',
    assets: process.env.S3_BUCKET_ASSETS || 'apex-asset-photos',
  },
}));
