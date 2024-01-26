export interface CreateUserInput {
	firstName: string
	lastName: string
	email: string
	password: string
}

export interface UpdateUserInfoInput {
	id: string
	firstName: string
	lastName: string
	email: string
}

export interface UpdateUserPasswordInput {
	id: string
	password: string
}
