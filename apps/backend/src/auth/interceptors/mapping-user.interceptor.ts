import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UsersService } from 'src/users/services'
import { RequestUser } from '../decorators/interface'

@Injectable()
export class MappingUserInterceptor implements NestInterceptor {
	constructor(
		@Inject(UsersService)
		private usersService: UsersService,
	) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest()
		const reqUser = request['user'] as RequestUser

		if (reqUser) {
			const user = this.usersService.getById(reqUser.id)
			if (user) {
				request['user'] = user
			}
		}
		return next.handle()
	}
}
