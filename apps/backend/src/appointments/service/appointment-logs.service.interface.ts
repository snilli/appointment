import { AppointmentStatusEnum } from '../appointments.interface'

export interface CreateAppointmentLogInput {
	name: string
	description: string
	status: AppointmentStatusEnum
	userId: string
	appointmentId: string
}
