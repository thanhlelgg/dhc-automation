import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { BusinessCustomers } from '../entity/BusinessCustomers';
import { Departments } from '../entity/Departments';
import { Workers } from '../entity/Workers';
import { Labs } from '../entity/Labs';
import { Segments } from '../entity/Segments';
import { DatabaseSchema } from '../models/enum-class/database-schema';
import { Items } from '../entity/Items';
import { CustomerMagnifications } from '../entity/CustomerMagnifications';
import { CustomerUnitPrices } from '../entity/CustomerUnitPrices';
import { Projects } from '../entity/Projects';
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
        orderBy?: string,
    ): Promise<T[]> {
        const connection = await DatabaseHelper.getConnection(database.schema);
        let data;
        try {
            const repository = connection.getRepository(object);
            let queryBuilder = repository.createQueryBuilder(alias).where(query);
            if (orderBy) {
                queryBuilder = queryBuilder.orderBy(orderBy);
            }
            data = await queryBuilder.getMany();
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
        orderBy?: string,
    ): Promise<T> {
        const connection = await DatabaseHelper.getConnection(database.schema);
        let data;
        try {
            const repository = connection.getRepository(object);
            let queryBuilder = repository.createQueryBuilder(alias).where(query);
            if (orderBy) {
                queryBuilder = queryBuilder.orderBy(orderBy);
            }
            data = await queryBuilder.getOne();
        } catch (error) {
            throw error;
        } finally {
            await connection.close();
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
     * Get active Business Customers from the database by id
     */
    public static async getActiveBusinessCustomerById(id: string | undefined): Promise<BusinessCustomers> {
        if (!id) {
            throw new Error('Business customer is not valid');
        }
        const alias = 'businessCustomers';
        const query = `${alias}.is_disable = 0 AND ${alias}.cd IS NOT NULL AND ${alias}.id = ${id}`;
        const businessCustomer = await DatabaseHelper.getOne(DatabaseSchema.BUSINESS, BusinessCustomers, alias, query);
        return businessCustomer;
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

    /**
     * Get existed code of worker from the database
     */
    public static async getExistedWorkerCode(): Promise<string> {
        const alias = 'workers';
        const query = `${alias}.is_deleted = 0 AND ${alias}.cd IS NOT NULL`;
        const worker = await DatabaseHelper.getOne(DatabaseSchema.BUSINESS, Workers, alias, query);
        if (worker && worker.cd) {
            return worker.cd;
        } else {
            throw new Error('Worker is not available');
        }
    }

    /**
     * Get active Items from the database
     */
    public static async getActiveItems(): Promise<Items[]> {
        const alias = 'items';
        const query = `${alias}.is_deleted = 0 AND ${alias}.cd IS NOT NULL`;
        const items = await DatabaseHelper.getAll(DatabaseSchema.BUSINESS, Items, alias, query);
        return items;
    }

    /**
     * Get a random Magnification from the database
     */
    public static async getRandomMagnification(): Promise<CustomerMagnifications> {
        const alias = 'customer_magnifications';
        const query = `${alias}.is_deleted = 0`;
        const orderBy = 'RAND()';
        const magnification = await DatabaseHelper.getOne(
            DatabaseSchema.BUSINESS,
            CustomerMagnifications,
            alias,
            query,
            orderBy,
        );
        return magnification;
    }

    /**
     * Get a unit price
     * @param businessCustomerId
     * @param startDate
     * @param endDate
     */
    public static async getCustomerUnitPrice(
        businessCustomerId: string,
        startDate: string,
        endDate: string,
    ): Promise<CustomerUnitPrices> {
        const alias = 'customer_unit_prices';
        const query = `${alias}.is_deleted = 0 AND ${alias}.business_customer_id = ${businessCustomerId} 
            AND ${alias}.start_date = '${startDate}' 
            AND ${alias}.end_date = '${endDate}'`;
        const unitPrice = await DatabaseHelper.getOne(DatabaseSchema.BUSINESS, CustomerUnitPrices, alias, query);
        return unitPrice;
    }

    /**
     * Get Projects by Accuracy, etc. (will add more)
     * @param accuracy (hight, middle, low)
     */
    public static async getProjectsBy(filter: {
        accuracy?: string,
        tag?: string
    }): Promise<Projects[]> {
        const alias = 'projects';
        let query = `${alias}.number IS NOT NULL`;

        if (filter.accuracy)
            query += ` AND ${alias}.accuracy = '${filter.accuracy.toLowerCase()}'`;
        if (filter.tag)
            query += ` AND ${alias}.tag LIKE '%${filter.tag.toLowerCase()}%'`;
            
        const projects = await DatabaseHelper.getAll(DatabaseSchema.BUSINESS, Projects, alias, query);
        return projects;
    }
}
