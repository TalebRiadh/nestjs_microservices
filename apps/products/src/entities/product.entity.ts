import { ObjectType, Field } from "@nestjs/graphql"
import {Entity,  Column, PrimaryGeneratedColumn } from "typeorm"


@Entity()
@ObjectType()
export class Product {
    
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
      })
      id: number;

    @Field(() => String)
    @Column()
    title: string



    @Field(() => String)
    @Column()
    description: string

    @Field(() => Number)
    @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2, default: 0.0 })
    price: number

    @Field(() => Boolean)
    @Column()
    available: boolean

}