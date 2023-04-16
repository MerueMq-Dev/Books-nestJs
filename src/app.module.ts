import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from "./configs/mongo.cofig";
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(),
    BookModule,
    AuthModule,
    MongooseModule.forRootAsync( {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return getMongoConfig(configService);
      },
      inject: [ConfigService]
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      }
    }),
    UserModule,
    // TypegooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: getMongoConfig
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
