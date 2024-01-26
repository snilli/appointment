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
import { CreateUserDto, UpdateUserInfoDto, UpdateUserPasswordDto } from './dto'
import { UsersService } from './services'

@Controller('users')
export class UsersController {
	constructor(@Inject(UsersService) private usersService: UsersService) {}

	@Get(':id')
	async get(@Param('id', ParseUUIDPipe) id: string) {
		const user = await this.usersService.getById(id)
		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	@Post()
	async create(@Body() dto: CreateUserDto) {
		const user = await this.usersService.create({
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email,
			password: dto.password,
		})

		if (!user) {
			throw new BadRequestException('Email already exist')
		}

		return user
	}

	@Patch(':id')
	async updateInfo(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserInfoDto) {
		const user = await this.usersService.updateInfo({
			id,
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email,
		})

		if (!user) {
			throw new NotFoundException('User not found')
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
			throw new NotFoundException('User not found')
		}

		return user
	}

	@Delete(':id')
	async detele(@Param('id', ParseUUIDPipe) id: string) {
		const user = await this.usersService.delete(id)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}
}
