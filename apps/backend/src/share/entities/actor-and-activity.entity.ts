import { Exclude } from 'class-transformer'
import { User } from 'src/users/users.entity'
import {
	CreateDateColumn,
	DeleteDateColumn,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

export class ActorAndActivityEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => User, { eager: true })
	@JoinColumn({
		name: 'created_by',
		referencedColumnName: 'id',
	})
	createdBy: User | string

	@ManyToOne(() => User, { eager: true })
	@JoinColumn({
		name: 'updated_by',
		referencedColumnName: 'id',
	})
	updatedBy: User | string

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
