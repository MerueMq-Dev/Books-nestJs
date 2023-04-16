import { BadRequestException, Body, Controller, HttpCode, HttpException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService,private userService:UserService) { }

	@UsePipes(new ValidationPipe({transform: true}))
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const { email } = await this.authService.validate(dto);
		return this.authService.login(email);
	}

	@UsePipes(new ValidationPipe({ transform: true }))
	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.userService.findByEmail(dto.email);
		if(oldUser) {
			throw new BadRequestException();
		}
		return this.userService.create(dto);
	}
}
