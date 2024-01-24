import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			port: 5432,
			username: 'superboy',
			password: 'sofast',
			database: 'appointments',
			synchronize: true,
			autoLoadEntities: true,
			host: 'localhost',
		}),
		AuthModule,
		UsersModule,
	],
})
export class AppModule {}
