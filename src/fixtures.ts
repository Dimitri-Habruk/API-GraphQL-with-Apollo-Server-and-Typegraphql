import { Country } from "./entity/Country.entity";
import datasource from "../lib/datasource";

async function addFixtures() {
  const countryRepository = datasource.getRepository(Country)

  const countries = [
    { code: "FR", name: "France", emoji: "🇫🇷", continent: "Europe" },
    { code: "BE", name: "Belgium", emoji: "🇧🇪", continent: "Europe" },
    { code: "AN", name: "Andorra", emoji: "🇦🇩", continent: "Europe" },
    { code: "IT", name: "Italy", emoji: "🇮🇹", continent: "Europe" },
    { code: "US", name: "United States", emoji: "🇺🇸", continent: "America" },
    { code: "CA", name: "Canada", emoji: "🇨🇦", continent: "America"}
];

  for (const country of countries) {
    const newCountry = countryRepository.create(country);
    await countryRepository.save(newCountry);
  }

  await countryRepository.close();
}

addFixtures().then(() => {
  console.log("Fixtures added");
}).catch(error => console.error("Error adding fixtures:", error));
