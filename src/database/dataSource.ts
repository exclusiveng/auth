import "reflect-metadata";
import { DataSource} from "typeorm";
import {User} from "../entities/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "samtom",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});



