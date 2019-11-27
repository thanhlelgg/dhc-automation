import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BusinessCustomers {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    cd: string | undefined;

    @Column('tinyint')
    is_disable: string | undefined;
}
