import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RequestUser } from './decorators/interface'
import { ReqUser } from './decorators/user.decorator'
import { Public } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Request() req) {
		return this.authService.login(req.user)
	}

	@Get('profile')
	getProfile(@ReqUser() user: RequestUser) {
		return user
	}
}
