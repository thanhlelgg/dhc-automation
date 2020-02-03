import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecialAllowances {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    name!: string;
}
