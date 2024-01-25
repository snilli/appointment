import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Configuration } from 'config/interface'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy, LocalStrategy } from './strategies'

@Module({
	imports: [
		UsersModule,
		PassportModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(configService: ConfigService<Configuration>) {
				const jwtSecret = configService.get<string>('jwtSecret')
				return {
					secret: jwtSecret,
					signOptions: { expiresIn: '7d' },
				}
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
