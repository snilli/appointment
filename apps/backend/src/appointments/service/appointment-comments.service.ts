import { buildPaginator } from '@lastlight/typeorm-cursor-pagination'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginatorInput } from 'src/share/interfaces'
import { User } from 'src/users/users.entity'
import { IsNull, Repository } from 'typeorm'
import { AppointmentComment } from '../entities/appointment-comments.entity'

@Injectable()
export class AppointmentCommentsService {
	constructor(
		@InjectRepository(AppointmentComment)
		private appointmentCommentsRepository: Repository<AppointmentComment>,
	) {}

	async create(userId: string, appointmentId: string, comment: string): Promise<AppointmentComment> {
		const appointmentComment = this.appointmentCommentsRepository.create({
			comment,
			appointment: appointmentId,
			createdBy: userId,
		})

		await this.appointmentCommentsRepository.save(appointmentComment)

		return appointmentComment
	}

	async delete(id: string, userId: string): Promise<AppointmentComment | null> {
		const appointmentComment = await this.getById(id)
		if (!appointmentComment) {
			return null
		}

		if ((appointmentComment.createdBy as User).id !== userId) {
			throw new UnauthorizedException()
		}

		await this.appointmentCommentsRepository.softDelete(id)
		return appointmentComment
	}

	async getById(id: string): Promise<AppointmentComment | null> {
		return await this.appointmentCommentsRepository.findOneBy({
			id: id,
			deletedAt: IsNull(),
		})
	}

	async update(id: string, userId: string, comment: string): Promise<AppointmentComment | null> {
		const appointmentComment = await this.getById(id)
		if (!appointmentComment) {
			return null
		}

		if ((appointmentComment.createdBy as User).id !== userId) {
			throw new UnauthorizedException()
		}

		appointmentComment.comment = comment
		appointmentComment.updatedBy = userId
		await this.appointmentCommentsRepository.save(appointmentComment)

		return appointmentComment
	}

	async getByPagination(appointmentId: string, input: PaginatorInput) {
		const paginator = buildPaginator({
			entity: AppointmentComment,
			paginationKeys: ['id'],
			query: {
				limit: input.limit,
				order: 'DESC',
				afterCursor: input.afterCursor,
				beforeCursor: input.beforeCursor,
			},
		})
		return await paginator.paginate(
			this.appointmentCommentsRepository
				.createQueryBuilder('appointment_comment')
				.where('appointment_comment.appointment.id = :id', { id: appointmentId }),
		)
	}
}
