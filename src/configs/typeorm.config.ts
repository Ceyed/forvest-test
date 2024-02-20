import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
require('dotenv').config();

enum TYPEORM_CONFIG {
  TYPEORM_DB_TYPE = 'mysql',
  TYPEORM_HOST = 'TYPEORM_HOST',
  TYPEORM_PORT = 'TYPEORM_PORT',
  TYPEORM_USERNAME = 'TYPEORM_USERNAME',
  TYPEORM_PASSWORD = 'TYPEORM_PASSWORD',
  TYPEORM_DATABASE = 'TYPEORM_DATABASE',
  TYPEORM_SYNCHRONIZE = 'TYPEORM_SYNCHRONIZE',
}

export class TypeormConfig {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  @IsNotEmpty()
  database: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  synchronize = false;

  @IsString()
  logging = 'all';

  @IsArray()
  entities = ['dist/**/*.entity{.ts,.js}'];

  constructor(obj: Partial<TypeormConfig>) {
    Object.assign(this, obj);
  }
}

export const typeormConfig = new TypeormConfig({
  type: TYPEORM_CONFIG.TYPEORM_DB_TYPE,
  host: process.env[TYPEORM_CONFIG.TYPEORM_HOST],
  database: process.env[TYPEORM_CONFIG.TYPEORM_DATABASE],
  username: process.env[TYPEORM_CONFIG.TYPEORM_USERNAME],
  password: process.env[TYPEORM_CONFIG.TYPEORM_PASSWORD],

  synchronize: process.env[TYPEORM_CONFIG.TYPEORM_SYNCHRONIZE].toLowerCase() === 'true',
  port: +process.env[TYPEORM_CONFIG.TYPEORM_PORT],
});
