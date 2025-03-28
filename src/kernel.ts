import express from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const DB_DIR = "./databases";
const DB_FILE = path.join(DB_DIR, "database.json");

if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR);
}

if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, "[]");
}

export const server = express();
server.use(express.json());


type TableSchema = Record<string, any>;

class Database {
    private tables: Map<string, { schema: TableSchema; data: any[] }> = new Map();
    constructor() {
        this.tables = new Map();
        this.loadFromFile();

    }

    private saveToFile() {
        fs.writeFileSync(DB_FILE, JSON.stringify([...this.tables.entries()], null, 2));
    }

    private loadFromFile() {
        if (!fs.existsSync(DB_FILE)) {
            const g = fs.writeFileSync(DB_FILE, JSON.stringify({}));
            console.log(g)
        }
        const rawData = fs.readFileSync(DB_FILE, "utf-8");
        console.log(rawData)
        if (!rawData.trim()) {
            const b = fs.writeFileSync(DB_FILE, JSON.stringify({}));
            console.log(b)
            return {};
        }
        console.log(rawData)
        const parsedData = JSON.parse(rawData);
        parsedData.forEach((entry: [string, { schema: TableSchema; data: any[] }]) => {
            this.tables.set(entry[0], entry[1]);
            console.log(this.tables)
        });
        return JSON.parse(rawData);
    }


    createTable(tableName: string, schema: TableSchema) {
        if (this.tables.has(tableName)) {
            throw new Error(`Table ${tableName} already exists`);
        }
        if (!schema._id) {
            schema._id = "";
        }
        this.tables.set(tableName, { schema, data: [] });
        console.log(tableName, { schema, data: [] })
        this.saveToFile();
    }


    insert(tableName: string, row: Record<string, any>) {
        const table = this.tables.get(tableName);
        if (!table) {
            throw new Error(`Table ${tableName} does not exist`);
        }
        for (const key in table.schema) {
            if (!(key in row) && key !== "_id") {
                throw new Error(`Missing required field: ${key}`);
            }
            if (key in row && typeof row[key] !== typeof table.schema[key]) {
                throw new Error(`Invalid type for ${key}: expected ${typeof table.schema[key]}, got ${typeof row[key]}`);
            }
        }
        row._id = uuidv4();
        table.data.push(row);
        this.saveToFile();
    }

    update(tableName: string, updateData: Record<string, any>) {
        const table = this.tables.get(tableName);
        if (!table) {
            throw new Error(`Table '${tableName}' not found`);
        }
        let updated = false;
        for (let i = 0; i < table.data.length; i++) {
            const row = table.data[i];
            if (Object.keys(updateData).every(key => row[key] !== undefined)) {
                table.data[i] = { ...row, ...updateData };
                updated = true;
                break;
            }
        }
        if (!updated) {
            throw new Error(`No matching record found`);
        }
        this.saveToFile();
    }

    delete(tableName: string, filter: Record<string, any>) {
        const table = this.tables.get(tableName);
        if (!table) {
            throw new Error(`Table '${tableName}' not found`);
        }
        if (!Array.isArray(table.data)) {
            throw new Error(`Table '${tableName}' has no valid data`);
        }
        const initialLength = table.data.length;
        table.data = table.data.filter(row =>
            !Object.keys(filter).every((key) => key in row && row[key as keyof typeof row] === filter[key])
        );
        if (table.data.length === initialLength) {
            throw new Error(`No matching record found`);
        }
        this.saveToFile();
    }


    getTableData(tableName: string) {
        const table = this.tables.get(tableName);
        console.log(table)
        if (!table) {
            throw new Error(`Table ${tableName} does not exist`);
        }
        return table.data;
    }
}

export const db = new Database();
