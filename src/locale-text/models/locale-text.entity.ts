import { MAX_TEXT_LENGTH } from 'src/common/constants/text.constants';
import { LocaleEntity } from 'src/locales/models/locale.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LocaleText {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: MAX_TEXT_LENGTH })
  text: string;

  @Column({ length: 50, unique: true })
  pId: string;

  @OneToOne((type) => LocaleEntity, (locale) => locale.id, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  locale: number;
}
