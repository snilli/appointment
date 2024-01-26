import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configuration } from 'config/configuration'
import { Configuration, ConfigurationDatabase } from 'config/interface'
import { AppointmentsModule } from './appointments/appointments.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 10,
			},
		]),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(configService: ConfigService<Configuration>) {
				const config = configService.get<ConfigurationDatabase>('database')
				if (!config) {
					throw new Error('Cannot load .env file for init app')
				}
				return {
					type: 'postgres',
					port: config.databasePort,
					username: config.databaseUsername,
					password: config.databasePassword,
					database: config.databaseName,
					synchronize: true,
					autoLoadEntities: true,
					host: config.databaseHost,
				}
			},
		}),
		AuthModule,
		UsersModule,
		AppointmentsModule,
	],
})
export class AppModule {}
