import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { OrderDto } from './order.dto';

export class UpdateDto extends OmitType(OrderDto, ['_id'] as const) {
  @IsOptional()
  @Exclude()
  _id: string;
}
