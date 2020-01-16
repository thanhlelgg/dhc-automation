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
import { Utilities } from '../common/utilities';
import { Constants } from '../common/constants';
import { Taxes } from '../entity/Taxes';
export class DatabaseHelper {
    /**
     * Get the connection to MySQL
     * @param database Schema name
     */
    public static async getConnection(database: string): Promise<Connection> {
        const host = process.env.HOST;
        const port = process.env.MYSQL_PORT;
        const username = process.env.MYSQL_USERNAME;
        const password = process.env.MYSQL_PASSWORD;
        if (!username || !password || !host || !port) {
            throw new Error('MySQL server credentials not found, please set all the MySQL credentials');
        }
        try {
            const connection = await createConnection({
                type: 'mysql',
                host: host,
                port: +port,
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

    /**
     * Get closing date by customer code
     * @param code
     */
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
     * Check Business customer exist
     * @param customerCode
     */
    public static async doesBusinessCustomerExist(customerCode: string): Promise<boolean> {
        const availableCustomer = await DatabaseHelper.getActiveBusinessCustomers();
        const taxNames = availableCustomer.map(customer => {
            return customer.cd;
        });
        return taxNames.includes(customerCode);
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
     * Get a random Business customer from the database
     */
    public static async getRandomBusinessCustomer(): Promise<BusinessCustomers> {
        const alias = 'businessCustomers';
        const query = `${alias}.is_deleted = 0 AND ${alias}.cd IS NOT NULL`;
        const orderBy = 'RAND()';
        const customer = await DatabaseHelper.getOne(DatabaseSchema.BUSINESS, BusinessCustomers, alias, query, orderBy);
        return customer;
    }

    /**
     * Get a random Project from the database
     */
    public static async getRandomProject(): Promise<Projects> {
        const alias = 'projects';
        const query = `${alias}.is_deleted = 0 AND ${alias}.number IS NOT NULL`;
        const orderBy = 'RAND()';
        const project = await DatabaseHelper.getOne(DatabaseSchema.BUSINESS, Projects, alias, query, orderBy);
        return project;
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
     * Check if Department exist
     * @param departmentName
     */
    public static async doesDepartmentExist(departmentName: string): Promise<boolean> {
        const availableDepartments = await DatabaseHelper.getActiveDepartments();
        const departmentCodes = availableDepartments.map(department => {
            return department.cd;
        });
        return departmentCodes.includes(departmentName);
    }

    /**
     * Get active Departments from the database
     */
    public static async getRandomDepartment(): Promise<Departments> {
        const alias = 'departments';
        const query = `${alias}.is_deleted = 0 AND ${alias}.cd IS NOT NULL`;
        const orderBy = 'RAND()';
        const departments = await DatabaseHelper.getOne(DatabaseSchema.BUSINESS, Departments, alias, query, orderBy);
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
     * Check if Worker exist
     * @param workerName
     */
    public static async doesWorkerExist(workerName: string): Promise<boolean> {
        const availableWorkers = await DatabaseHelper.getActiveWorkers();
        const workerCodes = availableWorkers.map(worker => {
            return worker.cd;
        });
        return workerCodes.includes(workerName);
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
     * Get Random Labs from the database
     */
    public static async getRandomLab(inHouseOnly = false): Promise<Labs> {
        const alias = 'labs';
        const category = inHouseOnly ? `${alias}.category = 0 AND` : '';
        const query = `${category} ${alias}.is_deleted IS NOT NULL`;
        const orderBy = 'RAND()';
        const labs = await DatabaseHelper.getOne(DatabaseSchema.TALENT, Labs, alias, query, orderBy);
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
     * Check if Segment exist
     * @param segmentName
     */
    public static async doesSegmentExist(segmentName: string): Promise<boolean> {
        const availableSegments = await DatabaseHelper.getActiveSegments();
        const segmentCodes = availableSegments.map(segment => {
            return segment.code;
        });
        return segmentCodes.includes(segmentName);
    }

    /**
     * Get active Taxes from the database
     */
    public static async getActiveTaxes(): Promise<Taxes[]> {
        const alias = 'segments';
        const query = `${alias}.is_deleted = 0 AND ${alias}.name IS NOT NULL`;
        const taxes = await DatabaseHelper.getAll(DatabaseSchema.BUSINESS, Taxes, alias, query);
        return taxes;
    }

    /**
     * Check if Tax name exist
     * @param taxName
     */
    public static async doesTaxNameExist(taxName: string): Promise<boolean> {
        const availableTaxes = await DatabaseHelper.getActiveTaxes();
        const taxNames = availableTaxes.map(tax => {
            return tax.name;
        });
        return taxNames.includes(taxName);
    }

    /**
     * Get a random existed Segments from the database
     */
    public static async getExistedSegment(): Promise<Segments> {
        const segments = await this.getActiveSegments();
        return segments[Utilities.getRandomNumber(0, segments.length - 1)];
    }

    /**
     * Get a random Segments from the database
     */
    public static async getRandomSegments(): Promise<Segments> {
        const alias = 'segments';
        const query = `${alias}.is_deleted = 0 AND ${alias}.code IS NOT NULL`;
        const orderBy = 'RAND()';
        const segments = await DatabaseHelper.getOne(DatabaseSchema.BUSINESS, Segments, alias, query, orderBy);
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
     * Check if Item exist
     * @param taxName
     */
    public static async doesItemExist(taxName: string): Promise<boolean> {
        const availableItems = await DatabaseHelper.getActiveItems();
        const itemCodes = availableItems.map(item => {
            return item.cd;
        });
        return itemCodes.includes(taxName);
    }

    /**
     * Get existed code of item from the database
     */
    public static async getExistedItem(): Promise<Items> {
        const activeItems: Items[] = await DatabaseHelper.getActiveItems();
        if (activeItems && activeItems.length > 0) {
            return activeItems[Utilities.getRandomNumber(0, activeItems.length - 1)];
        } else {
            throw new Error('There is no available Items');
        }
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
     * Get a customer Magnification
     * @param businessCustomerId
     * @param startDate
     * @param endDate
     */
    public static async getCustomerMagnifications(
        businessCustomerId: string,
        endDate: string,
    ): Promise<CustomerMagnifications> {
        const alias = 'customer_magnifications';
        const query = `${alias}.is_deleted = 0 AND ${alias}.business_customer_id = ${businessCustomerId} 
            AND ${alias}.end_date = '${endDate}'`;
        const unitPrice = await DatabaseHelper.getOne(DatabaseSchema.BUSINESS, CustomerMagnifications, alias, query);
        return unitPrice;
    }

    /**
     * GET a random Unit prices with valid information
     */
    public static async getRandomCustomerUnitPrices(): Promise<CustomerUnitPrices> {
        const alias = 'customer_unit_prices';
        const query = `${alias}.is_deleted = 0 AND ${alias}.leader > 0 
                        AND ${alias}.tester > 0 AND ${alias}.end_date = '${Constants.DEFAULT_END_DATE}'`;
        const orderBy = 'RAND()';
        const unitPrices = await DatabaseHelper.getOne(
            DatabaseSchema.BUSINESS,
            CustomerUnitPrices,
            alias,
            query,
            orderBy,
        );
        return unitPrices;
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
    public static async getProjectsBy(filter: { accuracy?: string; tag?: string }): Promise<Projects[]> {
        const alias = 'projects';
        let query = `${alias}.number IS NOT NULL`;

        if (filter.accuracy) query += ` AND ${alias}.accuracy = '${filter.accuracy.toLowerCase()}'`;
        if (filter.tag) query += ` AND ${alias}.tag LIKE '%${filter.tag.toLowerCase()}%'`;

        const projects = await DatabaseHelper.getAll(DatabaseSchema.BUSINESS, Projects, alias, query);
        return projects;
    }
}
