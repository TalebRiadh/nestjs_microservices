import { Args, ID, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import {ProductCreateInput,
        ProductCreateOutput,
        ProductDeleteOutuput, 
        ProductUpdateInput, 
        ProductUpdateOutput} from '../../domain/dto'
import { Product } from "../../domain/models/product";
import { ProductsService } from "apps/products/src/application/products.service";
import { Inject, UseGuards } from '@nestjs/common';
import { JWTPayload } from "apps/auth/src/application/auth.service";
import { CurrentUser, JwtAuthGuard } from "apps/auth/src/infrastructure/guards/jwt-auth.guard";
import { PUB_SUB } from "@app/common";
import { RedisPubSub } from "graphql-redis-subscriptions/dist/redis-pubsub";

enum SUBSCRIPTION_EVENTS {
    newProduct = 'newProduct',
}

@Resolver(Product)
export class ProductMutationsResolver {
    allSubscribers: ProductCreateOutput[] = []
    constructor(private readonly  productService: ProductsService, @Inject(PUB_SUB) private readonly pubSub: RedisPubSub){}
    
    @UseGuards(JwtAuthGuard)
    @Mutation(() => ProductCreateOutput)
    async productCreate(@CurrentUser()user: JWTPayload,@Args('input') input: ProductCreateInput){
        let new_product = await this.productService.productCreate(user, input)
        this.allSubscribers.push(new_product)
        this.pubSub.publish(SUBSCRIPTION_EVENTS.newProduct, {newProduct: new_product})
        return new_product;
    }

    @Subscription(returns => ProductCreateOutput)
    newProduct(){
        return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newProduct)
    }

    @Mutation(() => ProductUpdateOutput)
    async productUpdate(
        @Args({name: 'productId', type: () => ID }) productId: Product['id'],
        @Args('input') input: ProductUpdateInput,
    ) {
        return this.productService.productUpdate(productId, input)
    }

    @Mutation(() => ProductDeleteOutuput)
    async productDelete(
        @Args({name: 'productId', type: () => ID }) productId: Product['id'],
    ) {
        return this.productService.productDelete(productId)
    }
    
}