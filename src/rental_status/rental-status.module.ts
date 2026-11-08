
import { Module } from '@nestjs/common';
import { RentalStatusController } from './rental-status.controller';
import { RentalStatusService } from './rental-status.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RentalStatusController],
  providers: [RentalStatusService],
})
export class RentalStatusModule {}
