import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//we want to specify the name in plural
@Entity({name: 'tags'})
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
