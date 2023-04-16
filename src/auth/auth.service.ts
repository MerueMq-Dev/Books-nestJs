import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { USER_NOT_FOUND_ERROR } from './auth.constants';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

	async validate({ email, password }: AuthDto): Promise<Pick<User, 'email'>> {
		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email }
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}
