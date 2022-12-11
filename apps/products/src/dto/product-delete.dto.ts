import {  Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "../entities/product.entity";




@ObjectType()
export class ProductDeleteOutuput {
    @Field(() => ID)
    productId: Product['id']
}