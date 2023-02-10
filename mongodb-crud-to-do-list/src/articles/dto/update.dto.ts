import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ArticleDto } from './article.dto';

export class UpdateDto extends OmitType(ArticleDto, ['_id'] as const) {
  @IsOptional()
  @Exclude()
  _id: string;
}
