import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { BlocksModule } from './blocks/blocks.module';
import { Block } from './blocks/entities/block.entity';
import { Image } from './images/entities/image.entity';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'postgres',
      username: 'postgres',
      password: 'vlcs-tech-hiring',
      synchronize: true,
      port: 5432,
      entities: [Block, Image],
    }),
    ImagesModule,
    BlocksModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
