import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppointmentsController } from './controllers/appointments.controller'
import { AppointmentComment } from './entities/appointment-comments.entity'
import { AppointmentLog } from './entities/appointment-logs.entity'
import { Appointment } from './entities/appointments.entity'
import { AppointmentsService } from './service'

@Module({
	imports: [TypeOrmModule.forFeature([Appointment, AppointmentLog, AppointmentComment])],
	providers: [AppointmentsService],
	controllers: [AppointmentsController],
	exports: [AppointmentsService],
})
export class AppointmentsModule {}
