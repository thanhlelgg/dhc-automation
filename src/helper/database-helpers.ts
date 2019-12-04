import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { BusinessCustomers } from '../entity/BusinessCustomers';
import { Departments } from '../entity/Departments';
import { Workers } from '../entity/Workers';
import { Labs } from '../entity/Labs';
import { Segments } from '../entity/Segments';
import { DatabaseSchema } from '../models/enum-class/database-schema';
export class DatabaseHelper {
    /**
     * Get the connection to MySQL
     * @param database Schema name
     */
    public static async getConnection(database: string): Promise<Connection> {
        const username = process.env.MYSQL_USERNAME;
        const password = process.env.MYSQL_PASSWORD;
        if (!username || !password) {
            throw new Error(
                'MySQL server credentials not found, please set the `MYSQL_USERNAME` and/or `MYSQL_PASSWORD` on .env file',
            );
        }
        try {
            const connection = await createConnection({
                type: 'mysql',
                host: 'dhc-jpw-dbm01.mysql.database.azure.com',
                port: 3306,
                username: username,
                password: password,
                database: database,
                entities: ['./built/entity/*.js'],
                synchronize: false,
            });
            return connection;
        } catch (error) {
            console.log(error);
            throw new Error("Can't connect to MySQL Server, please check the log file for more details");
        }
    }

    /**
     * Get all records from the database
     * @param database
     * @param object
     * @param alias
     * @param query
     */
    public static async getAll<T>(
        database: DatabaseSchema,
        object: new () => T,
        alias: string,
        query: string,
    ): Promise<T[]> {
        const connection = await DatabaseHelper.getConnection(database.schema);
        let data;
        try {
            const repository = connection.getRepository(object);
            data = await repository
                .createQueryBuilder(alias)
                .where(query)
                .getMany();
        } catch (error) {
            throw error;
        } finally {
            connection.close();
        }
        if (data) {
            return data;
        } else {
            throw new Error('No record was found.');
        }
    }

    /**
     * Get one record from the database
     * @param database
     * @param object
     * @param alias
     * @param query
     */
    public static async getOne<T>(
        database: DatabaseSchema,
        object: new () => T,
        alias: string,
        query: string,
    ): Promise<T> {
        const connection = await DatabaseHelper.getConnection(database.schema);
        let data;
        try {
            const repository = connection.getRepository(object);
            data = await repository
                .createQueryBuilder(alias)
                .where(query)
                .getOne();
        } catch (error) {
            throw error;
        } finally {
            connection.close();
        }
        if (data) {
            return data;
        } else {
            throw new Error('No record was found.');
        }
    }

    public static async getClosingDateByBusinessCustomerCode(code: string): Promise<number> {
        const alias = 'businessCustomers';
        const query = `${alias}.cd = "${code}"`;
        const businessCustomer = await DatabaseHelper.getOne(DatabaseSchema.BUSINESS, BusinessCustomers, alias, query);
        if (businessCustomer.closing_date_group) {
            return businessCustomer.closing_date_group;
        } else {
            throw new Error('Customer or closing date is not available');
        }
    }

    /**
     * Get active Business Customers from the database
     */
    public static async getActiveBusinessCustomers(): Promise<BusinessCustomers[]> {
        const alias = 'businessCustomers';
        const query = `${alias}.is_disable = 0 AND ${alias}.cd IS NOT NULL`;
        const businessCustomers = await DatabaseHelper.getAll(DatabaseSchema.BUSINESS, BusinessCustomers, alias, query);
        return businessCustomers;
    }

    /**
     * Get active Departments from the database
     */
    public static async getActiveDepartments(): Promise<Departments[]> {
        const alias = 'departments';
        const query = `${alias}.is_deleted = 0 AND ${alias}.cd IS NOT NULL`;
        const departments = await DatabaseHelper.getAll(DatabaseSchema.BUSINESS, Departments, alias, query);
        return departments;
    }

    /**
     * Get active Workers from the database
     */
    public static async getActiveWorkers(): Promise<Workers[]> {
        const alias = 'workers';
        const query = `${alias}.is_deleted = 0 AND ${alias}.cd IS NOT NULL`;
        const workers = await DatabaseHelper.getAll(DatabaseSchema.BUSINESS, Workers, alias, query);
        return workers;
    }

    /**
     * Get active Labs from the database
     */
    public static async getLabs(inHouseOnly = false): Promise<Labs[]> {
        const alias = 'labs';
        const category = inHouseOnly ? `${alias}.category = 0 AND` : '';
        const query = `${category} ${alias}.is_deleted IS NOT NULL`;
        const labs = await DatabaseHelper.getAll(DatabaseSchema.TALENT, Labs, alias, query);
        return labs;
    }

    /**
     * Get active Segments from the database
     */
    public static async getActiveSegments(): Promise<Segments[]> {
        const alias = 'segments';
        const query = `${alias}.is_deleted = 0 AND ${alias}.code IS NOT NULL`;
        const segments = await DatabaseHelper.getAll(DatabaseSchema.BUSINESS, Segments, alias, query);
        return segments;
    }
}
