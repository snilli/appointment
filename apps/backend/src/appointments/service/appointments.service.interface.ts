import { AppointmentStatusEnum } from '../appointments.interface'

export interface UpdateAppointmentInput {
	id: string
	name: string
	description: string
	status: AppointmentStatusEnum
	userId: string
}
