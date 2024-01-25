import { IsEnum, IsNotEmpty } from 'class-validator'
import { AppointmentStatusEnum } from 'src/appointments/appointments.interface'

export class UpdateAppointmentDto {
	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	description: string

	@IsEnum(AppointmentStatusEnum)
	@IsNotEmpty()
	status: AppointmentStatusEnum
}
