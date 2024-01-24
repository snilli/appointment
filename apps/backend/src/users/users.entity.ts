import { genSalt, hash } from 'bcrypt'
import { Exclude } from 'class-transformer'
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm'
import { UserRoleEnum } from './users.interface'

@Entity()
@Unique('user_email', ['email'])
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

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

	@Column({ default: 'user', enum: UserRoleEnum })
	role: string

	@CreateDateColumn({
		name: 'created_at',
	})
	createdAt: Date

	@UpdateDateColumn({
		name: 'updated_at',
	})
	updatedAt: Date

	@DeleteDateColumn({
		name: 'deleted_at',
	})
	deletedAt: Date

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
