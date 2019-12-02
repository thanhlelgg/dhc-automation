import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Labs {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    code: string | undefined;

    @Column('text')
    name: string | undefined;
}
