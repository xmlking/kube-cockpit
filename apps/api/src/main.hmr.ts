import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(), { cors: true });
  const config: ConfigService = app.get(ConfigService);
  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.getNumber('PORT') || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
