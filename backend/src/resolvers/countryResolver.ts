import { 
  Resolver, 
  Query, 
  Mutation, 
  InputType, 
  Arg, 
  Field } from "type-graphql";
import Country from "../entities/Country";
import Continent from "../entities/Continent";

@InputType()
class CountryInput implements Partial<Country> {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;
}

@Resolver()
class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    try {
      return await Country.find();
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  @Query(() => Country)
  async country(
    @Arg("code") code: string
  ): Promise<Country> {
    try {
      return await Country.findOneByOrFail({ code: code });
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  @Query(() => [Country])
  async continentCountries(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    try {
      return await Country.find({
        relations: ["continent"],
        where: { continent: { code: continentCode } }
      });
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("countryInput") countryInput: CountryInput,
    @Arg("continentCode") continentCode: string
  ): Promise<Country> {
    try {
      const existantContinent = await Continent.findOneBy({ code: continentCode });

      if (existantContinent) {
        return await Country.save({ 
          ...countryInput,
          continent: existantContinent
        });
      }

      const continent = await Continent.save({ code: continentCode });
      return await Country.save({ 
        ...countryInput,
        continent: continent
      });
      
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
}

export default CountryResolver;