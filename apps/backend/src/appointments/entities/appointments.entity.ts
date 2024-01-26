import { Transform } from 'class-transformer'
import { ActorAndActivityEntity } from 'src/share/entities'
import { Column, Entity } from 'typeorm'
import { AppointmentStatusEnum, AppointmentStatusPreviewEnum } from '../appointments.interface'

@Entity()
export class Appointment extends ActorAndActivityEntity {
	@Column()
	name: string

	@Column()
	description: string

	@Transform(({ value }) => AppointmentStatusPreviewEnum[value])
	@Column({ type: 'enum', default: AppointmentStatusEnum.TODO, enum: AppointmentStatusEnum })
	status: AppointmentStatusEnum

	haveChange(name: string, description: string, status: AppointmentStatusEnum): boolean {
		if (this.name !== name || this.description !== description || this.status !== status) {
			return true
		}

		return false
	}
}
