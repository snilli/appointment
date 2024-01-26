import { Exclude } from 'class-transformer'
import { ActorAndActivityEntity } from 'src/share/entities'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Appointment } from './appointments.entity'

@Entity({
	name: 'appointment_comment',
})
export class AppointmentComment extends ActorAndActivityEntity {
	@Column()
	comment: string

	@Exclude()
	@ManyToOne(() => Appointment)
	@JoinColumn({
		name: 'appointment_id',
		referencedColumnName: 'id',
	})
	appointment: Appointment | string
}
