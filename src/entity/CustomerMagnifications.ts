import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerMagnifications {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    business_customer_id!: string;

    @Column('date')
    start_date!: string;

    @Column('date')
    end_date!: string;

    @Column('decimal')
    overtime!: number;

    @Column('decimal')
    late_night!: number;

    @Column('decimal')
    late_night_overtime!: number;

    @Column('decimal')
    holiday!: number;

    @Column('decimal')
    holiday_late_night!: number;
}
