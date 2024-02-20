import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
require('dotenv').config();

class ServerConfig {
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsNumber()
  port: number;

  @IsNumber()
  salt: number;

  @IsString()
  @IsNotEmpty()
  jwt_access_token_secret: string;

  @IsString()
  @IsNotEmpty()
  jwt_access_token_expiration_time: string;

  constructor(obj: Partial<ServerConfig>) {
    Object.assign(this, obj);
  }
}

enum SERVER_CONFIG {
  HOST = 'HOST',
  PORT = 'PORT',
  SALT = 'SALT',
  JWT_ACCESS_TOKEN_SECRET = 'JWT_ACCESS_TOKEN_SECRET',
  JWT_ACCESS_TOKEN_EXPIRATION_TIME = 'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
}

export const serverConfig = new ServerConfig({
  host: process.env.HOST,
  port: +process.env[SERVER_CONFIG.PORT],
  salt: +process.env[SERVER_CONFIG.SALT],
  jwt_access_token_secret: process.env[SERVER_CONFIG.JWT_ACCESS_TOKEN_SECRET],
  jwt_access_token_expiration_time: process.env[SERVER_CONFIG.JWT_ACCESS_TOKEN_EXPIRATION_TIME],
});
