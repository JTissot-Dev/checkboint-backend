import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Continent from "./Continent";


@Entity()
@ObjectType()
class Country extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  emoji: string;

  @Field(() => Continent)
  @ManyToOne(() => Continent, (continent) => continent.countries)
  continent: Continent;
}

export default Country;