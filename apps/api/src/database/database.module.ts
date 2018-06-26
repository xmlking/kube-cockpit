import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      entities: ['./**/**.entity{.ts,.js}'],
      keepConnectionAlive: true,
      // logging: false,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
