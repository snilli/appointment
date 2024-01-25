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
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto'
import { AppointmentsService } from '../service/appointments.service'

@Controller('appointments')
export class AppointmentsController {
	constructor(@Inject(AppointmentsService) private appointmentsService: AppointmentsService) {}

	@Get(':id')
	async get(@Param('id', ParseUUIDPipe) id: string) {
		const appointment = await this.appointmentsService.getUserById(id)
		if (!appointment) {
			throw new NotFoundException('Appointment not found')
		}

		return appointment
	}

	@Post()
	async create(@Body() dto: CreateAppointmentDto) {
		const user = await this.appointmentsService.create('', dto.name, dto.description)

		return user
	}

	@Patch(':id')
	async updateInfo(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAppointmentDto) {
		const appointment = await this.appointmentsService.update({
			id: id,
			name: dto.name,
			description: dto.description,
			status: dto.status,
			userId: '',
		})

		if (!appointment) {
			throw new NotFoundException('Appointment not found')
		}

		return appointment
	}

	@Delete(':id')
	async detele(@Param('id', ParseUUIDPipe) id: string) {
		const appointment = await this.appointmentsService.delete(id)

		if (!appointment) {
			throw new NotFoundException('Appointment not found')
		}

		return appointment
	}
}
