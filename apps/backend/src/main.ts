import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { JwtAuthGuard } from './auth/guards'
import { MappingUserInterceptor } from './auth/interceptors/mapping-user.interceptor'
import { UsersService } from './users/services'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const refector = app.get(Reflector)

	const usersService = await app.get<UsersService>(UsersService)
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	)
	app.useGlobalGuards(new JwtAuthGuard(refector))
	app.useGlobalInterceptors(new ClassSerializerInterceptor(refector))
	app.useGlobalInterceptors(new MappingUserInterceptor(usersService))
	await app.listen(3000)
}
bootstrap()
