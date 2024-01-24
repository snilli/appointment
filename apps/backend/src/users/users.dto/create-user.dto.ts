import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword } from 'class-validator'
import { UserRoleEnum } from '../users.interface'

export class CreateUserDto {
	@IsNotEmpty()
	firstName: string

	@IsNotEmpty()
	lastName: string

	@IsEmail()
	email: string

	@IsStrongPassword()
	password: string

	@IsNotEmpty()
	@IsEnum(UserRoleEnum)
	role: string
}
