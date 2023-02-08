import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { DocumentNotFound } from './documents.exception';
import { DocumentsService } from './documents.service';
import { CreateDto } from './dto/create.dto';
import { DocumentDto } from './dto/document.dto';
import { UpdateDto } from './dto/update.dto';
import { Document } from './models/documents.model';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create with success',
    type: CreateDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async create(@Body() createDto: CreateDto): Promise<Document> {
    try {
      return this.documentsService.create(createDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list all data',
    type: DocumentDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<Document[]> {
    return this.documentsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get one record',
    type: DocumentDto,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findById(@Param('id') id): Promise<Document> {
    try {
      return this.documentsService.findById(id);
    } catch (error) {
      if (error instanceof DocumentNotFound) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'updated',
    type: DocumentDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  public async update(
    @Param('id') id,
    @Body() updateDto: UpdateDto,
  ): Promise<Document> {
    try {
      return this.documentsService.update(id, updateDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'deleted',
    type: DocumentDto,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  public async delete(@Param('id') id): Promise<Document> {
    try {
      return this.documentsService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
