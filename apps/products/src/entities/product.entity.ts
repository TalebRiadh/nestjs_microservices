import { ObjectType, Field } from "@nestjs/graphql"
import { User } from "apps/users/src/entities/user.entity"
import {Entity,  Column, JoinColumn, ManyToOne, RelationId} from "typeorm"
import { Node } from "@app/common"


@Entity()
@ObjectType()
export class Product extends Node{

    @Field(() => String)
    @Column()
    reference: string

    @Field(() => String)
    @Column()
    description: string

    @Field(() => Number)
    @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2, default: 0.0 })
    price: number

    @Field(() => Boolean)
    @Column()
    available: boolean

    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn()
    creator: User

    @RelationId((self: Product) => self.creator)
    readonly creatorId: User['id']
}