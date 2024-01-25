export interface Configuration {
	port: number
	database: ConfigurationDatabase
	jwtSecret: string
}

export interface ConfigurationDatabase {
	databaseName: string
	databaseHost: string
	databasePort: number
	databaseUsername: string
	databasePassword: string
}
