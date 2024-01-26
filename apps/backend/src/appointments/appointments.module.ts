import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppointmentCommentsController } from './controllers/appointment-comments.controller'
import { AppointmentsController } from './controllers/appointments.controller'
import { AppointmentComment } from './entities/appointment-comments.entity'
import { AppointmentLog } from './entities/appointment-logs.entity'
import { Appointment } from './entities/appointments.entity'
import { AppointmentsService } from './service'
import { AppointmentCommentsService } from './service/appointment-comments.service'
import { AppointmentLogsService } from './service/appointment-logs.service'

@Module({
	imports: [TypeOrmModule.forFeature([Appointment, AppointmentLog, AppointmentComment])],
	providers: [AppointmentsService, AppointmentLogsService, AppointmentCommentsService],
	controllers: [AppointmentsController, AppointmentCommentsController],
})
export class AppointmentsModule {}
