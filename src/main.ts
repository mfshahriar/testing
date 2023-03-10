import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // to remove all the properties that are not defined in the DTO (protects from malicious users)
  })); // to use validation pipe logic globally (class validation)
  await app.listen(3000);
}
bootstrap();
