import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { BusinessCustomers } from '../entity/BusinessCustomers';
import { Departments } from '../entity/Departments';
import { Workers } from '../entity/Workers';
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
            return await createConnection({
                type: 'mysql',
                host: 'dhc-jpw-dbm01.mysql.database.azure.com',
                port: 3306,
                username: username,
                password: password,
                database: database,
                entities: ['./built/entity/*.js'],
                synchronize: false,
            });
        } catch (error) {
            console.log(error);
            throw new Error("Can't connect to MySQL Server, please check the log file for more details");
        }
    }

    /**
     * Get active Business Customers from the database
     */
    public static async getActiveBusinessCustomers(): Promise<BusinessCustomers[]> {
        const connection = await DatabaseHelper.getConnection('business');
        const businessCustomerRepository = connection.getRepository(BusinessCustomers);
        const businessCustomers = await businessCustomerRepository
            .createQueryBuilder('businessCustomers')
            .where('businessCustomers.is_disable = 0 AND businessCustomers.cd IS NOT NULL')
            .getMany();
        await connection.close();
        return businessCustomers;
    }

    /**
     * Get active Departments from the database
     */
    public static async getActiveDepartments(): Promise<Departments[]> {
        const connection = await DatabaseHelper.getConnection('business');
        const departmentsRepository = connection.getRepository(Departments);
        const departments = await departmentsRepository
            .createQueryBuilder('departments')
            .where('departments.is_deleted = 0 AND departments.cd IS NOT NULL')
            .getMany();
        await connection.close();
        return departments;
    }

    /**
     * Get active Workers from the database
     */
    public static async getActiveWorkers(): Promise<Workers[]> {
        const connection = await DatabaseHelper.getConnection('business');
        const workersRepository = connection.getRepository(Workers);
        const workers = await workersRepository
            .createQueryBuilder('workers')
            .where('workers.is_deleted = 0 AND workers.cd IS NOT NULL')
            .getMany();
        await connection.close();
        return workers;
    }
}
