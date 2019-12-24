import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Segments {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    code: string | undefined;

    @Column('text')
    name: string | undefined;

    @Column('tinyint')
    is_deleted: string | undefined;
}
