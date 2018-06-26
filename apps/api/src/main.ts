import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(), { cors: true });
  const config: ConfigService = app.get(ConfigService);
  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.getNumber('PORT') || 3000, '0.0.0.0');
}
bootstrap();
