import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LocaleEntity } from './models/locale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocaleInput } from './models/locale-input.model';
import { Locale, PaginatedLocales } from './models/locale.model';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginationInput } from 'src/pagination/models/pagination-input.model';

@Injectable()
export class LocalesService {
  constructor(
    @InjectRepository(LocaleEntity)
    private localeRepository: Repository<LocaleEntity>,
    private paginationService: PaginationService,
  ) {}

  async getById(id: number) {
    return this.localeRepository.findOne({ where: { id } });
  }

  async getByHandle(handle: string) {
    return this.localeRepository.findOne({ where: { handle } });
  }

  async list(page: PaginationInput): Promise<PaginatedLocales> {
    return await this.paginationService.paginate<Locale>(
      this.localeRepository,
      page,
    );
  }

  async create(data: CreateLocaleInput) {
    if (await this.getByHandle(data.handle))
      throw new Error('A locale with the given handle already exists');

    const locale = await this.localeRepository.insert(data);
    return { ...data, ...locale.generatedMaps[0] } as Locale;
  }
}
