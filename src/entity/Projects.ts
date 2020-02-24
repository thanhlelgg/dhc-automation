import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    number!: string;

    @Column('text')
    name: string | undefined;

    @Column('text')
    accuracy: string | undefined;

    @Column('text')
    tag: string | undefined;
}
