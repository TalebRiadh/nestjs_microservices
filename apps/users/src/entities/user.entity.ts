import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "apps/products/src/entities/product.entity";
import { Node } from "@app/common";
import { Entity, Column, OneToMany } from "typeorm";


@Entity()
@ObjectType()
export class User extends Node {

    @Field(() => String)
    @Column({unique: true})
    email: string
    
    @Field(() => String)
    @Column()
    username: string

    @Field(() => String)
    @Column()
    password: string

    @OneToMany(() => Product, (target) => target.creator)
    products: Product[]


}