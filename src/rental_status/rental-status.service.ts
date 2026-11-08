
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

@Injectable()
export class RentalStatusService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  private pool = () => this.databaseService.getPool();

  // CREATE RENTAL STATUS
  async create(status_code: string, status_name: string) {
    const [result] = await this.pool().execute<ResultSetHeader>(
      'INSERT INTO rental_status (status_code, status_name) VALUES (?, ?)',
      [status_code, status_name],
    );

    return {
      message: 'Rental status created successfully',
      status_id: result.insertId,
      status_code,
      status_name,
    };
  }

  // GET ALL RENTAL STATUS
  async findAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM rental_status ORDER BY status_id DESC',
    );

    return rows;
  }

  // GET RENTAL STATUS BY ID
  async findOne(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM rental_status WHERE status_id = ?',
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Rental status not found');
    }

    return rows[0];
  }

  // UPDATE RENTAL STATUS
  async update(
    id: number,
    status_code: string,
    status_name: string,
  ) {
    await this.findOne(id);

    await this.pool().execute(
      `UPDATE rental_status
       SET status_code = ?, status_name = ?
       WHERE status_id = ?`,
      [status_code, status_name, id],
    );

    return {
      message: 'Rental status updated successfully',
    };
  }
}
