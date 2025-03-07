"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const index_1 = require("./index");
const main = async () => {
    console.log('Running migrations...');
    try {
        await (0, migrator_1.migrate)(index_1.db, { migrationsFolder: './drizzle' });
        console.log('Migrations completed successfully');
    }
    catch (error) {
        console.error('Migration failed:', error);
        throw error;
    }
    finally {
        await index_1.pool.end();
    }
};
main().catch(console.error);
