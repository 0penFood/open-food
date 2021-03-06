import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger} from '../helpers/logger';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  const config = new DocumentBuilder()
      .setTitle('Open Food API')
      .setDescription('An API for Open Food')
      .setVersion('1')
      .addTag('openfood')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await Logger.infoLog('server', 'Server started')
  await app.listen(3333);
}
bootstrap();

