import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { Appointment } from '../entities/appointments.entity'
import { UpdateAppointmentInput } from './appointments.service.interface'

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectRepository(Appointment)
		private appointmentsRepository: Repository<Appointment>,
	) {}

	async create(userId: string, name: string, description: string): Promise<Appointment> {
		const appointment = this.appointmentsRepository.create({
			name,
			description,
			createdBy: userId,
		})

		await this.appointmentsRepository.save(appointment)

		return appointment
	}

	async delete(id: string): Promise<Appointment | null> {
		const user = await this.getUserById(id)
		if (!user) {
			return null
		}

		await this.appointmentsRepository.softDelete(id)
		return user
	}

	async getUserById(id: string): Promise<Appointment | null> {
		return await this.appointmentsRepository.findOneBy({
			id: id,
			deletedAt: IsNull(),
		})
	}

	async update(input: UpdateAppointmentInput): Promise<Appointment | null> {
		const appointment = await this.getUserById(input.id)
		if (!appointment) {
			return null
		}

		appointment.name = input.name
		appointment.description = input.description
		appointment.updatedBy = input.userId
		await this.appointmentsRepository.save(appointment)

		return appointment
	}
}
