import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>){}

	async create(dto: CreateUserDto) {
		const salt = await genSalt(10);

		const data = {
			email: dto.email,
			passwordHash: await hash(dto.password, salt)
		}
		const createdUser = new this.userModel(data);
		return createdUser.save();
	}

	async findByEmail(email: string) {
		return this.userModel.findOne({ email: email }).exec();
	}
}
