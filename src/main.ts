import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverConfig } from './configs/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(serverConfig.port, serverConfig.host);
}
bootstrap();
