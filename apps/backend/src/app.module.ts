import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configuration } from 'config/configuration'
import { Configuration, ConfigurationDatabase } from 'config/interface'
import { AuthModule } from './auth/auth.module'
import { User } from './users/users.entity'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
		}),
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
					entities: [User],
				}
			},
		}),

		AuthModule,
		UsersModule,
	],
})
export class AppModule {}
