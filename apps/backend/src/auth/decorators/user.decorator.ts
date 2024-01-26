import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { RequestUser } from './interface'

export const ReqUser = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const user = request.user
	if (!user) {
		throw new UnauthorizedException()
	}

	return user as RequestUser
})
