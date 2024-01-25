import { ActorAndActivityEntity } from 'src/share/entities'
import { Column, Entity } from 'typeorm'

@Entity()
export class AppointmentComment extends ActorAndActivityEntity {
	@Column()
	comment: string
}
