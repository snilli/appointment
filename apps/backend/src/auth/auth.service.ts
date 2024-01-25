import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { UsersService } from 'src/users/services'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.getUserByEmail(email)
		if (!user || !compareSync(pass, user.password)) {
			return null
		}

		return user
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user.id }
		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
