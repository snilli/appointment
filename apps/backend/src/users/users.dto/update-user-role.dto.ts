import { IsEnum, IsNotEmpty } from 'class-validator'
import { UserRoleEnum } from '../users.interface'

export class UpdateUserRoleDto {
	@IsNotEmpty()
	@IsEnum(UserRoleEnum)
	role: string
}
