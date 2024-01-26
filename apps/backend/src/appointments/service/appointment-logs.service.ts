import { buildPaginator } from '@lastlight/typeorm-cursor-pagination'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginatorInput } from 'src/share/interfaces'
import { Repository } from 'typeorm'
import { AppointmentLog } from '../entities/appointment-logs.entity'
import { CreateAppointmentLogInput } from './appointment-logs.service.interface'

@Injectable()
export class AppointmentLogsService {
	constructor(
		@InjectRepository(AppointmentLog)
		private appointmentLogsRepository: Repository<AppointmentLog>,
	) {}

	async create(input: CreateAppointmentLogInput): Promise<AppointmentLog> {
		const appointmentComment = this.appointmentLogsRepository.create({
			name: input.name,
			description: input.description,
			createdBy: input.userId,
			appointment: input.appointmentId,
			status: input.status,
		})

		await this.appointmentLogsRepository.save(appointmentComment)

		return appointmentComment
	}

	async deleteByAppointmentId(appointmentId: string): Promise<AppointmentLog[]> {
		const appointmentComments = await this.getAllByAppointmentId(appointmentId)

		if (!appointmentComments.length) {
			return []
		}

		await this.appointmentLogsRepository.softDelete(appointmentComments.map((app) => app.id))
		return appointmentComments
	}

	async getAllByAppointmentId(appointmentId: string): Promise<AppointmentLog[]> {
		return await this.appointmentLogsRepository.find({
			relations: ['appointment'],
			where: {
				appointment: { id: appointmentId },
			},
		})
	}

	async getByPagination(appointmentId: string, input: PaginatorInput) {
		const paginator = buildPaginator({
			entity: AppointmentLog,
			paginationKeys: ['id'],
			query: {
				limit: input.limit,
				order: 'DESC',
				afterCursor: input.afterCursor,
				beforeCursor: input.beforeCursor,
			},
		})
		return await paginator.paginate(
			this.appointmentLogsRepository
				.createQueryBuilder('appointmentlog')
				.where('appointmentlog.appointment.id = :id', { id: appointmentId }),
		)
	}
}
