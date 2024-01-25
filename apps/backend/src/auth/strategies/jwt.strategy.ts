import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Configuration } from 'config/interface'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@Inject(ConfigService) private configService: ConfigService<Configuration>) {
		const jwtSecret = configService.get<string>('jwtSecret') ?? ''
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtSecret,
		})
	}

	async validate(payload: any) {
		return { id: payload.sub, email: payload.email }
	}
}
