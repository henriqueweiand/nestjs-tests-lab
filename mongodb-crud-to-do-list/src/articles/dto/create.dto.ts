import { OmitType } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';

export class CreateDto extends OmitType(ArticleDto, ['_id'] as const) {}
