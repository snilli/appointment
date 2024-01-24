import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator'

export class UpdateUserInfoDto {
	@IsUUID()
	id: string

	@IsNotEmpty()
	firstName: string

	@IsNotEmpty()
	lastName: string

	@IsEmail()
	email: string
}
