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
import { User } from 'src/users/users.entity'
import { CreateCommentDto, UpdateCommentDto } from '../dto/comments'
import { AppointmentCommentsService } from '../service/appointment-comments.service'

@Controller('comments')
export class AppointmentCommentsController {
	constructor(@Inject(AppointmentCommentsService) private appointmentCommentsService: AppointmentCommentsService) {}

	@Get(':id')
	async get(@Param('id', ParseUUIDPipe) id: string) {
		const appointment = await this.appointmentCommentsService.getById(id)
		if (!appointment) {
			throw new NotFoundException('Comment not found')
		}

		return appointment
	}

	@Post()
	async create(@ReqUser() reqUser: RequestUser, @Body() dto: CreateCommentDto) {
		const comment = await this.appointmentCommentsService.create(reqUser.id, dto.appointmentId, dto.comment)
		comment.createdBy = User.createFromReq(reqUser)
		return comment
	}

	@Patch(':id')
	async update(
		@ReqUser() reqUser: RequestUser,
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdateCommentDto,
	) {
		const comment = await this.appointmentCommentsService.update(id, reqUser.id, dto.comment)

		if (!comment) {
			throw new NotFoundException('Comment not found')
		}

		comment.updatedBy = User.createFromReq(reqUser)
		return comment
	}

	@Delete(':id')
	async detele(@ReqUser() user: RequestUser, @Param('id', ParseUUIDPipe) id: string) {
		const comment = await this.appointmentCommentsService.delete(id, user.id)
		if (!comment) {
			throw new NotFoundException('Comment not found')
		}

		return comment
	}
}
