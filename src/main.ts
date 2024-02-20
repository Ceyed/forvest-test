import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverConfig } from './configs/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`🐼 Server is running on: http://${serverConfig.host}:${serverConfig.port}`);
  });
}
bootstrap();
