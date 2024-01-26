import { genSalt, hash } from 'bcrypt'
import { Exclude } from 'class-transformer'
import { RequestUser } from 'src/auth/decorators/interface'
import { ActivityEntity } from 'src/share/entities'
import { BeforeInsert, BeforeUpdate, Column, Entity, Unique } from 'typeorm'

@Entity()
@Unique('user_email', ['email'])
export class User extends ActivityEntity {
	@Column({
		name: 'first_name',
	})
	firstName: string

	@Column({
		name: 'last_name',
	})
	lastName: string

	@Column()
	email: string

	@Column()
	@Exclude()
	password: string

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword(): Promise<void> {
		const salt = await genSalt()
		this.password = await hash(this.password, salt)
	}

	updateInfo(firstName: string, lastName: string, email: string) {
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
	}

	static createFromReq(reqUser: RequestUser): User {
		const user = new User()
		user.id = reqUser.id
		user.email = reqUser.email
		user.createdAt = new Date(reqUser.createdAt)
		user.updatedAt = new Date(reqUser.updatedAt)
		user.firstName = reqUser.firstName
		user.lastName = reqUser.lastName
		return user
	}
}
