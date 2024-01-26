import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common'
import { RequestUser } from 'src/auth/decorators/interface'
import { ReqUser } from 'src/auth/decorators/user.decorator'
import { GetPaginationDto } from 'src/share/dto/get-pagination.dto'
import { User } from 'src/users/users.entity'
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto'
import { Appointment } from '../entities/appointments.entity'
import { AppointmentCommentsService } from '../service/appointment-comments.service'
import { AppointmentLogsService } from '../service/appointment-logs.service'
import { AppointmentsService } from '../service/appointments.service'

@Controller('appointments')
export class AppointmentsController {
	constructor(
		@Inject(AppointmentsService) private appointmentsService: AppointmentsService,
		@Inject(AppointmentLogsService) private appointmentLogsService: AppointmentLogsService,
		@Inject(AppointmentCommentsService) private appointmentCommentsService: AppointmentCommentsService,
	) {}

	@Get(':id')
	async get(@Param('id', ParseUUIDPipe) id: string) {
		const appointment = await this.appointmentsService.getById(id)
		if (!appointment) {
			throw new NotFoundException('Appointment not found')
		}

		return appointment
	}

	@Get()
	async getAll(@Body() dto: GetPaginationDto) {
		return await this.appointmentsService.getByPagination(dto)
	}

	@Post()
	async create(@ReqUser() reqUser: RequestUser, @Body() dto: CreateAppointmentDto) {
		const appointment = await this.appointmentsService.create(reqUser.id, dto.name, dto.description)
		appointment.createdBy = User.createFromReq(reqUser)
		return appointment
	}

	@Patch(':id')
	async updateInfo(
		@ReqUser() reqUser: RequestUser,
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateAppointmentDto,
	) {
		console.log(dto)
		const prev = (await this.appointmentsService.getById(id)) as Appointment
		const [appointment, haveChange] = await this.appointmentsService.update({
			id: id,
			name: dto.name,
			description: dto.description,
			status: dto.status,
			userId: reqUser.id,
		})

		if (!prev || !appointment) {
			throw new NotFoundException('Appointment not found')
		}

		if (haveChange) {
			await this.appointmentLogsService.create({
				userId: reqUser.id,
				appointmentId: appointment.id,
				name: prev.name,
				description: prev.description,
				status: prev.status,
			})

			appointment.updatedBy = User.createFromReq(reqUser)
		}

		return appointment
	}

	@Delete(':id')
	async detele(@Param('id', ParseUUIDPipe) id: string) {
		const appointment = await this.appointmentsService.getById(id)
		if (!appointment) {
			throw new NotFoundException('Appointment not found')
		}

		await this.appointmentLogsService.deleteByAppointmentId(appointment.id)
		await this.appointmentsService.delete(appointment.id)

		return appointment
	}

	@Get(':id/logs')
	async getAllLogs(@Param('id', ParseUUIDPipe) id: string, @Body() dto: GetPaginationDto) {
		return await this.appointmentLogsService.getByPagination(id, dto)
	}

	@Get(':id/comments')
	async getAllComment(@Param('id', ParseUUIDPipe) id: string, @Body() dto: GetPaginationDto) {
		return await this.appointmentLogsService.getByPagination(id, dto)
	}
}
