
import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
  ) {}

  // CREATE CUSTOMER
  @Post()
  async createCustomer(
    @Body()
    body: {
      username: string;
      password: string;
      contact_number: string;
    },
  ) {
    return this.customersService.createCustomer(
      body.username,
      body.password,
      body.contact_number,
    );
  }

  // GET ALL CUSTOMERS
  @Get()
  async getAllCustomers() {
    return this.customersService.getAllCustomers();
  }
}
