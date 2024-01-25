import { ActorAndActivityEntity } from 'src/share/entities'
import { Column, Entity } from 'typeorm'
import { AppointmentStatusEnum } from '../appointments.interface'

@Entity()
export class AppointmentLog extends ActorAndActivityEntity {
	@Column()
	name: string

	@Column()
	description: string

	@Column({ default: AppointmentStatusEnum.TODO, enum: AppointmentStatusEnum })
	status: AppointmentStatusEnum
}
