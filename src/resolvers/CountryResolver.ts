import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country.entity";
import CountryServices from "../services/CountryServices"; 


@Resolver()
export class CountryResolver {
    private countryService = new CountryServices()
    @Query(() => [Country])
    async countries() {
        return await this.countryService.list();
    }

    @Query(() => Country)
    async country(@Arg('code', () => String) code: string) {
        return await this.countryService.find(code);
    }

    @Query(() => [Country])
    async countriesByContinent(@Arg("continent") continent: string) {
        return await  this.countryService.find(continent);
    }

    @Mutation(() => Country)
    async addCountry(
        @Arg("code") code: string,
        @Arg("name") name: string,
        @Arg("emoji") emoji: string,
        @Arg("continent") continent: string
    ): Promise<Country> {
        return await this.countryService.create({ code, name, emoji });
    }

    @Mutation(() => Country)
    async updateCountry(
        @Arg("code") code: string,
        @Arg("name", { nullable: true }) name?: string,
        @Arg("emoji", { nullable: true }) emoji?: string,
        @Arg("continent",  { nullable: true }) continent?: string

    ): Promise<Country | null> {
        return await this.countryService.update(code, { name, emoji, continent});
    }

    @Mutation(() => Boolean)
    async deleteCountry(@Arg("code") code: string): Promise<boolean> {
        return await this.countryService.delete(code);
    }
}