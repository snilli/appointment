import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, QueryFailedError, Repository } from 'typeorm'
import { User } from '../users.entity'
import { CreateUserInput, UpdateUserInfoInput, UpdateUserPasswordInput, UpdateUserRoleInput } from './interface'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async create(input: CreateUserInput): Promise<User | null> {
		const user = this.usersRepository.create({
			firstName: input.firstName,
			lastName: input.lastName,
			email: input.email,
			password: input.password,
			role: input.role,
		})
		try {
			await this.usersRepository.save(user)
		} catch (e) {
			if (e instanceof QueryFailedError && e['constraint'] === 'user_email') {
				return null
			}
		}
		return user
	}

	async delete(id: string): Promise<User | null> {
		const user = await this.getUserById(id)
		if (!user) {
			return null
		}

		await this.usersRepository.softDelete(id)
		return user
	}

	async getUserById(id: string): Promise<User | null> {
		return await this.usersRepository.findOneBy({
			id: id,
			deletedAt: IsNull(),
		})
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return await this.usersRepository.findOneBy({ email })
	}

	async updateInfo(input: UpdateUserInfoInput): Promise<User | null> {
		const user = await this.getUserById(input.id)
		if (!user) {
			return null
		}

		user.updateInfo(input.firstName, input.lastName, input.email)
		return this.usersRepository.save(user)
	}

	async updatePassword(input: UpdateUserPasswordInput): Promise<User | null> {
		const user = await this.getUserById(input.id)
		if (!user) {
			return null
		}

		user.password = input.password
		return this.usersRepository.save(user)
	}

	async updateRole(input: UpdateUserRoleInput): Promise<User | null> {
		const user = await this.getUserById(input.id)
		if (!user) {
			return null
		}

		user.role = input.role
		return this.usersRepository.save(user)
	}
}
