import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Country from "./Country";

@Entity()
@ObjectType()
class Continent extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  code: string;

  @Field(() => [Country])
  @OneToMany(() => Country, (country) => country.continent, { eager: true })
  countries: Country[];
}

export default Continent;