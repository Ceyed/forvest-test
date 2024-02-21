import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { AppModule } from './app.module';
import { serverConfig } from './configs/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * Validation pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // * Swagger
  const config = new DocumentBuilder()
    .setTitle('Forvest')
    .addBearerAuth()
    .setDescription('The Forvest API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, { swaggerOptions: { docExpansion: 'all' } });

  app.use('/uploads', express.static('uploads'));

  await app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`🐼 Server is running on: http://${serverConfig.host}:${serverConfig.port}`);
    console.log(`  > docs is available on: http://${serverConfig.host}:${serverConfig.port}/docs`);
  });
}
bootstrap();
