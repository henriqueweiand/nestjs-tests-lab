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
import { OrdersService } from './orders.service';
import { CreateDto } from './dto/create.dto';
import { OrderDto } from './dto/order.dto';
import { UpdateDto } from './dto/update.dto';
import { OrderDocument } from './schemas/orders.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create with success',
    type: CreateDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async create(@Body() createDto: CreateDto): Promise<OrderDocument> {
    return this.ordersService.create(createDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'list all data',
    type: OrderDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<OrderDocument[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get one record',
    type: OrderDto,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  public async findById(@Param('id') id): Promise<OrderDocument> {
    return this.ordersService.findById(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'updated',
    type: OrderDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  public async update(
    @Param('id') id,
    @Body() updateDto: UpdateDto,
  ): Promise<OrderDocument> {
    return this.ordersService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'deleted',
    type: OrderDto,
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  public async delete(@Param('id') id): Promise<boolean> {
    return this.ordersService.delete(id);
  }
}
