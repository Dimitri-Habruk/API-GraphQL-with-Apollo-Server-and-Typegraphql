import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Country {
@Field(() => ID)
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

@Field()
@Column()
continent: string;
}