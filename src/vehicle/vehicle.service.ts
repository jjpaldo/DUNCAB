
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} 

from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DatabaseService } from '../database/database.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly databaseService: DatabaseService) {}

private get pool() {
  return this.databaseService.getPool();
}

  // POST - Add a new vehicle
  async create(createVehicleDto: CreateVehicleDto) {
    const {
      vehicle_code,
      vehicle_name,
      plate_number,
      price_per_day,
      type_id,
    } = createVehicleDto;

    const [result] = await this.pool.execute<ResultSetHeader>(
      `INSERT INTO vehicle
      (vehicle_code, vehicle_name, plate_number, price_per_day, type_id)
      VALUES (?, ?, ?, ?, ?)`,
      [vehicle_code, vehicle_name, plate_number, price_per_day, type_id],
    );

    return {
      message: 'Vehicle successfully added',
      vehicle_id: result.insertId,
    };
  }

  // GET - Display all vehicles
  async findAll() {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM vehicle ORDER BY vehicle_id DESC',
    );

    return rows;
  }

  // GET - Display vehicle by ID
  async findOne(id: number) {
    const [rows] = await this.pool.execute<RowDataPacket[]>(
      'SELECT * FROM vehicle WHERE vehicle_id = ?',
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return rows[0];
  }

  // PATCH - Update vehicle
  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const allowedFields = [
      'vehicle_code',
      'vehicle_name',
      'plate_number',
      'price_per_day',
      'type_id',
    ] as const;

    const updates: string[] = [];
    const values: (string | number)[] = [];

    for (const field of allowedFields) {
      const value = updateVehicleDto[field];

      if (value !== undefined) {
        updates.push(`${field} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) {
      throw new BadRequestException('No fields provided for update');
    }

    values.push(id);

    const [result] = await this.pool.execute<ResultSetHeader>(
      `UPDATE vehicle SET ${updates.join(', ')},
      updated_at = CURRENT_TIMESTAMP
      WHERE vehicle_id = ?`,
      values,
    );

    if (result.affectedRows === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return {
      message: 'Vehicle successfully updated',
    };
  }

  // DELETE - Remove vehicle
  async remove(id: number) {
    const [result] = await this.pool.execute<ResultSetHeader>(
      'DELETE FROM vehicle WHERE vehicle_id = ?',
      [id],
    );

    if (result.affectedRows === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return {
      message: 'Vehicle successfully deleted',
    };
  }
}

