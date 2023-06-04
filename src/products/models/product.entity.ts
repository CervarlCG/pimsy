import { MAX_TEXT_LENGTH } from 'src/common/constants/text.constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ length: MAX_TEXT_LENGTH })
  description: string;
}
