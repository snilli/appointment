import { Transform } from 'class-transformer'
import { ActorAndActivityEntity } from 'src/share/entities'
import { Column, Entity, OneToMany } from 'typeorm'
import { AppointmentStatusEnum } from '../appointments.interface'
import { AppointmentComment } from './appointment-comments.entity'
import { AppointmentLog } from './appointment-logs.entity'

@Entity()
export class Appointment extends ActorAndActivityEntity {
	@Column()
	name: string

	@Column()
	description: string

	@Column({ default: AppointmentStatusEnum.TODO, enum: AppointmentStatusEnum })
	@Transform(({ value }) => value.id)
	status: AppointmentStatusEnum

	@OneToMany<AppointmentLog>((type) => type, (log) => log.id)
	logs: AppointmentLog[]

	@OneToMany<AppointmentComment>(() => AppointmentComment, (comment) => comment.id)
	comments: AppointmentComment[]
}
