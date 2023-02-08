import { OmitType } from '@nestjs/swagger';
import { DocumentDto } from './document.dto';

export class CreateDto extends OmitType(DocumentDto, ['_id'] as const) {}
