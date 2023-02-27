import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class OrderDto {
  @IsUUID()
  @ApiProperty()
  _id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  currencyFrom: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  currencyTo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  valueFrom: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  valueTo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  comment: string;
}
