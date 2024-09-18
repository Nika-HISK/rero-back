import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  app.enableCors({
    origin: 'reroapp.ge',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,  
  });
  
  await app.listen(3000);
}
bootstrap();
