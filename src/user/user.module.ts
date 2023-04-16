import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
