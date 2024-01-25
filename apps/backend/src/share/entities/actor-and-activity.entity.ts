import { Exclude } from 'class-transformer'
import { User } from 'src/users/users.entity'
import {
	CreateDateColumn,
	DeleteDateColumn,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

export class ActorAndActivityEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@OneToOne(() => User)
	@JoinColumn({
		name: 'created_by',
	})
	createdBy: string

	@OneToOne(() => User)
	@JoinColumn({
		name: 'updated_by',
	})
	updatedBy: string

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
	@Exclude()
	deletedAt: Date
}
