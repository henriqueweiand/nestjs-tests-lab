import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateDto } from './dto/create.dto';
import { ArticleDto } from './dto/article.dto';
import { UpdateDto } from './dto/update.dto';
import { ArticleDocument } from './schemas/articles.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

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
  public async create(@Body() createDto: CreateDto): Promise<ArticleDocument> {
    return this.articlesService.create(createDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list all data',
    type: ArticleDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<ArticleDocument[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get one record',
    type: ArticleDto,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findById(@Param('id') id): Promise<ArticleDocument> {
    return this.articlesService.findById(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'updated',
    type: ArticleDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  public async update(
    @Param('id') id,
    @Body() updateDto: UpdateDto,
  ): Promise<ArticleDocument> {
    return this.articlesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'deleted',
    type: ArticleDto,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  public async delete(@Param('id') id): Promise<boolean> {
    return this.articlesService.delete(id);
  }
}
