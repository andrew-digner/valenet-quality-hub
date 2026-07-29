import { registerAs } from '@nestjs/config';

export default registerAs('storage', () => ({
  bucket: process.env.STORAGE_BUCKET,
  directory: process.env.STORAGE_DIRECTORY,
  maxUploadMb: Number(process.env.STORAGE_MAX_UPLOAD_MB),
}));
