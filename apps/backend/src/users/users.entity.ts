import { genSalt, hash } from 'bcrypt'
import { Exclude } from 'class-transformer'
import { ActivityEntity } from 'src/share/entities'
import { BeforeInsert, BeforeUpdate, Column, Entity, Unique } from 'typeorm'
import { UserRoleEnum } from './users.interface'

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

	@Column({ default: UserRoleEnum.USER, enum: UserRoleEnum })
	role: string

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
}
