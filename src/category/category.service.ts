
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  // CREATE CATEGORY
  async createCategory(type_code: string, type_name: string) {
    const [result] = await this.databaseService.getPool().execute<ResultSetHeader>(
      'INSERT INTO vehicle_type (type_code, type_name) VALUES (?, ?)',
      [type_code, type_name],
    );

    return {
      message: 'Vehicle category created successfully',
      type_id: result.insertId,
      type_code,
      type_name,
    };
  }

  // GET ALL CATEGORIES
  async getAllCategories() {
    const [rows] = await this.databaseService.getPool().execute<RowDataPacket[]>(
      'SELECT * FROM vehicle_type ORDER BY type_id DESC',
    );

    return rows;
  }

  // GET CATEGORY BY ID
  async getCategoryById(id: number) {
    const [rows] = await this.databaseService.getPool().execute<RowDataPacket[]>(
      'SELECT * FROM vehicle_type WHERE type_id = ?',
      [id],
    );

    if (rows.length === 0) {
      throw new NotFoundException('Vehicle category not found');
    }

    return rows[0];
  }

  // UPDATE CATEGORY
  async updateCategory(id: number, type_code: string, type_name: string) {
    await this.getCategoryById(id);

    await this.databaseService.getPool().execute(
      'UPDATE vehicle_type SET type_code = ?, type_name = ? WHERE type_id = ?',
      [type_code, type_name, id],
    );

    return {
      message: 'Vehicle category updated successfully',
    };
  }

  // DELETE CATEGORY
  async deleteCategory(id: number) {
    await this.getCategoryById(id);

    await this.databaseService.getPool().execute(
      'DELETE FROM vehicle_type WHERE type_id = ?',
      [id],
    );

    return {
      message: 'Vehicle category deleted successfully',
    };
  }
}
