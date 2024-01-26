import { buildPaginator } from '@lastlight/typeorm-cursor-pagination'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginatorInput } from 'src/share/interfaces'
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
		const appointment = await this.getById(id)
		if (!appointment) {
			return null
		}

		await this.appointmentsRepository.softDelete(id)
		return appointment
	}

	async getById(id: string): Promise<Appointment | null> {
		return await this.appointmentsRepository.findOneBy({
			id: id,
			deletedAt: IsNull(),
		})
	}

	async getByPagination(input: PaginatorInput) {
		const paginator = buildPaginator({
			entity: Appointment,
			paginationKeys: ['id'],
			query: {
				limit: input.limit,
				order: 'ASC',
				afterCursor: input.afterCursor,
				beforeCursor: input.beforeCursor,
			},
		})
		return await paginator.paginate(this.appointmentsRepository.createQueryBuilder('appointment'))
	}

	async update(input: UpdateAppointmentInput): Promise<[Appointment | null, boolean]> {
		const appointment = await this.getById(input.id)
		if (!appointment) {
			return [null, false]
		}
		const haveChange = appointment.haveChange(input.name, input.description, input.status)
		if (!haveChange) {
			return [appointment, false]
		}

		appointment.name = input.name
		appointment.description = input.description
		appointment.updatedBy = input.userId
		appointment.status = input.status
		await this.appointmentsRepository.save(appointment)

		return [appointment, true]
	}
}
