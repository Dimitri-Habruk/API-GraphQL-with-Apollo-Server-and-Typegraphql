import { DataSource } from "typeorm";
import { Country } from "../entities/Country.entity";

export default new DataSource({
  type: "sqlite",
  database: "countries.db",
  entities: [Country],
  synchronize: true, //à ne pas utiliser en production
  logging: ["error", "query"], //à ne pas utiliser en production
});

