import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    name!: string;

    @Column('tinyint')
    is_deleted: string | undefined;
}
