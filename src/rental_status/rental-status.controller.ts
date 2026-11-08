
import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { RentalStatusService } from './rental-status.service';

@Controller('rental-status')
export class RentalStatusController {
  constructor(
    private readonly rentalStatusService: RentalStatusService,
  ) {}

  // CREATE RENTAL STATUS
  @Post()
  async create(@Body() body: {
    status_code: string;
    status_name: string;
  }) {
    return this.rentalStatusService.create(
      body.status_code,
      body.status_name,
    );
  }

  // GET ALL RENTAL STATUS
  @Get()
  async findAll() {
    return this.rentalStatusService.findAll();
  }

  // GET RENTAL STATUS BY ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rentalStatusService.findOne(id);
  }

  // UPDATE RENTAL STATUS
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: {
      status_code: string;
      status_name: string;
    },
  ) {
    return this.rentalStatusService.update(
      id,
      body.status_code,
      body.status_name,
    );
  }
}
