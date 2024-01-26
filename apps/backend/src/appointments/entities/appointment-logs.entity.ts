import { Exclude, Transform } from 'class-transformer'
import { ActorAndActivityEntity } from 'src/share/entities'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { AppointmentStatusEnum, AppointmentStatusPreviewEnum } from '../appointments.interface'
import { Appointment } from './appointments.entity'

@Entity({
	name: 'appointment_log',
})
export class AppointmentLog extends ActorAndActivityEntity {
	@Column()
	name: string

	@Column()
	description: string

	@Transform(({ value }) => AppointmentStatusPreviewEnum[value])
	@Column({ type: 'enum', default: AppointmentStatusEnum.TODO, enum: AppointmentStatusEnum })
	status: AppointmentStatusEnum

	@Exclude()
	@ManyToOne(() => Appointment)
	@JoinColumn({
		name: 'appointment_id',
		referencedColumnName: 'id',
	})
	appointment: Appointment | string
}
