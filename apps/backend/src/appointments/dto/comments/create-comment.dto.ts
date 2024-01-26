import { IsNotEmpty } from 'class-validator'

export class CreateCommentDto {
	@IsNotEmpty()
	appointmentId: string

	@IsNotEmpty()
	comment: string
}
