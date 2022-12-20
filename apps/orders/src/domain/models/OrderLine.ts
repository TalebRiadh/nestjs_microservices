import { Node } from "@app/common";
import { Field } from "@nestjs/graphql";
import { Product } from "apps/products/src/domain/models/product";
import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";



@Entity()
export class OrderLine extends Node  {

     @OneToOne(()=> Product)
     @JoinColumn()   
     product: Product

     
    @RelationId((self: OrderLine) => self.product) 
    readonly productId: Product['id']

    @Field(() => Number)
    @Column()
    quantity: number


    @Field(() => Number)
    @Column({ name: 'unitPrice', type: 'decimal', precision: 10, scale: 2, default: 0.0 })
    unitPrice: number
}