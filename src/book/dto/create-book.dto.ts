import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateBookDto {
	@IsString()
	@IsNotEmpty()
	title: string;	

	@IsString()
	@IsNotEmpty()
	description: string;

	@Min(1)
	@IsNumber()
	countPages: number;

	@IsString()
	@IsNotEmpty()
	author: string;
}