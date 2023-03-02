import { OmitType } from '@nestjs/swagger';
import { OrderDto } from './order.dto';

export class CreateDto extends OmitType(OrderDto, ['_id'] as const) {}
