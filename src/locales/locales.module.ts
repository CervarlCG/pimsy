import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocaleEntity } from './models/locale.entity';
import { LocalesResolver } from './locales.resolver';
import { LocalesService } from './locales.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocaleEntity])],
  providers: [LocalesResolver, LocalesService, PaginationService],
})
export class LocalesModule {}
