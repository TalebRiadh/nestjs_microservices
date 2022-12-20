import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import {ProductCreateInput,
        ProductCreateOutput,
        ProductDeleteOutuput, 
        ProductUpdateInput, 
        ProductUpdateOutput} from '../../domain/dto'
import { Product } from "../../domain/models/product";
import { ProductsService } from "apps/products/src/application/products.service";
import { UseGuards } from '@nestjs/common';
import { JWTPayload } from "apps/auth/src/application/auth.service";
import { CurrentUser, JwtAuthGuard } from "apps/auth/src/infrastructure/guards/jwt-auth.guard";

@Resolver(Product)
export class ProductMutationsResolver {
    constructor(private readonly  productService: ProductsService){}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => ProductCreateOutput)
    async productCreate(
        @CurrentUser()
        user: JWTPayload,
        @Args('input') 
        input: ProductCreateInput){
        return this.productService.productCreate(user, input);
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