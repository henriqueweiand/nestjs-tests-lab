import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.APP_PORT || 8080;
  const serverUrl =
    process.env.NODE_ENV == 'production' && !!process.env.BASE_URL
      ? process.env.BASE_URL
      : `http://localhost:${port}`;

  const options = new DocumentBuilder()
    .setTitle(process.env.NAME)
    .setVersion('1.0')
    .addTag(process.env.NAME)
    .addServer(serverUrl)
    .build();

  const article = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, article);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
