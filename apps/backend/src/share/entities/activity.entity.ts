import { Exclude } from 'class-transformer'
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class ActivityEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

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
