
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CustomersService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  // CREATE CUSTOMER
  async createCustomer(
    username: string,
    password: string,
    contact_number: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await this.databaseService
      .getPool()
      .execute<ResultSetHeader>(
        `INSERT INTO customers
        (username, password, contact_number)
        VALUES (?, ?, ?)`,
        [username, hashedPassword, contact_number],
      );

    return {
      message: 'Customer created successfully',
      customer_id: result.insertId,
      username,
      contact_number,
    };
  }

  // GET ALL CUSTOMERS
  async getAllCustomers() {
    const [rows] = await this.databaseService
      .getPool()
      .execute<RowDataPacket[]>(
        `SELECT customer_id, username, contact_number,
         created_at, updated_at
         FROM customers
         ORDER BY customer_id DESC`,
      );

    return rows;
  }
}
