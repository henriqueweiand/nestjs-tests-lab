import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './models/documents.model';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { DocumentNotFound } from './documents.exception';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel('Document')
    private readonly documentsModel: Model<Document>,
  ) {}

  public async create(createDto: CreateDto): Promise<Document> {
    const document = new this.documentsModel(createDto);
    return document.save();
  }

  public async findAll(): Promise<Document[]> {
    return this.documentsModel.find();
  }

  public async findById(id: string): Promise<Document> {
    try {
      return await this.documentsModel.findById(id);
    } catch (e) {
      throw new DocumentNotFound();
    }
  }

  public async update(id: string, updateDto: UpdateDto) {
    return this.documentsModel.findByIdAndUpdate({ _id: id }, updateDto, {
      new: true,
    });
  }

  public async delete(id: string) {
    return this.documentsModel.findOneAndDelete({ _id: id });
  }
}
