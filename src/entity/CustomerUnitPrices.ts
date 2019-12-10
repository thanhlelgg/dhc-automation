import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerUnitPrices {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    business_customer_id!: string;

    @Column('int')
    leader!: number;

    @Column('int')
    tester!: number;
}
