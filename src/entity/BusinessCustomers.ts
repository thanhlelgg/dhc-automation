import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BusinessCustomers {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    cd!: string;

    @Column('text')
    name!: string;

    @Column('tinyint')
    is_disable: string | undefined;

    @Column('int')
    closing_date_group: number | undefined;
}
