import {
	BadRequestException,
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
import { CreateUserDto, UpdateUserPasswordDto } from './users.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(@Inject(UsersService) private usersService: UsersService) {}
	@Get()
	get() {
		return null
	}

	@Post()
	async create(@Body() dto: CreateUserDto) {
		const user = await this.usersService.create({
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email,
			password: dto.password,
			role: dto.role,
		})

		if (!user) {
			throw new BadRequestException('Email already exist')
		}

		return user
	}

	@Patch(':id/password')
	async updatePassword(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserPasswordDto) {
		const user = await this.usersService.updatePassword({
			id,
			password: dto.password,
		})

		if (!user) {
			throw new NotFoundException()
		}

		return user
	}

	@Delete(':id')
	async detele(@Param('id', ParseUUIDPipe) id: string) {
		const user = await this.usersService.delete(id)

		if (!user) {
			throw new NotFoundException()
		}

		return user
	}
}
