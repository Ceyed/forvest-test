import { serverConfig } from './server.config';

export const UPLOAD_MAX_LIMIT: number = +serverConfig.upload_max_limit_mb * 1250000;
export const UPLOAD_SUPPORTED_FORMATS = new RegExp(serverConfig.upload_supported_formats);
