import {  Field, ID, ObjectType } from "@nestjs/graphql";
import { Product } from "../models/product";




@ObjectType()
export class ProductDeleteOutuput {
    @Field(() => ID)
    productId: Product['id']
}