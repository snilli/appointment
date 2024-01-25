import { IsNotEmpty } from 'class-validator'

export class CreateAppointmentDto {
	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	description: string
}
