import { Configuration } from './interface'

export const configuration = (): Configuration => ({
	port: parseInt(process.env.PORT ?? '', 10) || 3000,
	database: {
		databaseHost: process.env.DATABASE_HOST ?? '',
		databasePort: parseInt(process.env.DATABASE_PORT ?? '', 10) || 5432,
		databaseName: process.env.DATABASE_NAME ?? '',
		databasePassword: process.env.DATABASE_PASSWORD ?? '',
		databaseUsername: process.env.DATABASE_USERNAME ?? '',
	},
	jwtSecret: process.env.JWT_SECRET ?? '',
})
