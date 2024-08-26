import { DataSource } from "typeorm";
import Country from "../entities/Country";
import Continent from "../entities/Continent";


const dataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  entities: [Country, Continent],
})

export default dataSource;