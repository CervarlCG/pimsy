import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocaleText } from './models/locale-text.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocaleText])],
  providers: [],
})
export class LocaleTextModule {}
