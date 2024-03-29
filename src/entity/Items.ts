import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Items {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    cd!: string;

    @Column('tinyint')
    is_deleted: string | undefined;
}
