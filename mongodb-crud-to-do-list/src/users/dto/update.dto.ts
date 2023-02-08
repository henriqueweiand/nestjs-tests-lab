import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { DocumentDto } from './document.dto';

export class UpdateDto extends OmitType(DocumentDto, ['_id'] as const) {
  @IsOptional()
  @Exclude()
  _id: string;
}
