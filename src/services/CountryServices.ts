import { Country } from "../entities/Country.entity";
import datasource from "../lib/datasource";
import { Repository } from "typeorm";

class CountryServices {
  db: Repository<Country>;

  constructor() {
    this.db = datasource.getRepository(Country);
  }

  async create(data: Partial<Country>) {
    const existingCountry = await this.db.findOne({ where: { code: data.code } });
    if (existingCountry) {
      throw new Error(`This country code already exist:  ${data.code}`);
    }
    const newCountry = this.db.create(data);
    await this.db.save(newCountry);
    return newCountry;
  }

  async list() {
    return await this.db.find();
  }

  async find(code: string) {
    const country = await this.db.findOne({ where: { code } });
    if (!country) {
      throw new Error(`Country no found with code : ${code} `);
    }
    return country;
  }

  async update(code: string, data: Partial<Country>) {
    const country = await this.find(code);
    if (!country) {
      throw new Error(`Country no found with code : ${code} `);
    }
    Object.assign(country, data);
    await this.db.save(country);
    return country;
  }

  async delete(code: string) {
    const country = await this.find(code);
    await this.db.remove(country);
    return true;
  }
}

export default CountryServices;