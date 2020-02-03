import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Positions {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    position_name!: string;
}
