require('dotenv').config();

class ServerConfig {
  host: string;
  port: number;

  constructor(obj: Partial<ServerConfig>) {
    Object.assign(this, obj);
  }
}

enum SERVER_CONFIG {
  Host = 'HOST',
  Port = 'PORT',
}

export const serverConfig = new ServerConfig({
  host: process.env.HOST,
  port: +process.env[SERVER_CONFIG.Port],
});
