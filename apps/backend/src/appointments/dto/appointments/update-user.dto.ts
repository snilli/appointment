import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { AppointmentStatusEnum, AppointmentStatusPreviewEnum } from 'src/appointments/appointments.interface'

export class UpdateAppointmentDto {
	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	description: string

	@IsEnum(AppointmentStatusPreviewEnum)
	@IsNotEmpty()
	@Transform(({ value }) => AppointmentStatusPreviewEnum[value])
	status: AppointmentStatusEnum
}
