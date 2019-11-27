import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workers {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    cd: string | undefined;

    @Column('tinyint')
    is_deleted: string | undefined;
}
