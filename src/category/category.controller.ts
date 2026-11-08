
import {
  Controller,
  Post,
  Put,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // CREATE CATEGORY
  @Post()
  async createCategory(
    @Body() body: { type_code: string; type_name: string },
  ) {
    return this.categoryService.createCategory(
      body.type_code,
      body.type_name,
    );
  }

  // GET ALL CATEGORIES
  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  // GET CATEGORY BY ID
  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryById(id);
  }

  // UPDATE CATEGORY
@Put(':id')
async updateCategory(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: { type_code: string; type_name: string },
) {
  return this.categoryService.updateCategory(
    id,
    body.type_code,
    body.type_name,
  );
}

  // DELETE CATEGORY
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }

}
