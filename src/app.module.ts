
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { CustomersModule } from './customers/customers.module';
import { RentalStatusModule } from './rental_status/rental-status.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    VehicleModule,
    CustomersModule,
    RentalStatusModule,
  ],
})
export class AppModule {}
