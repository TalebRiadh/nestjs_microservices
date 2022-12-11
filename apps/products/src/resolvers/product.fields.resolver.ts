import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "apps/users/src/entities/user.entity";
import { Product } from "../entities/product.entity";
import { ProductsService } from "apps/products/src/products.service";
import { UsersService } from "apps/users/src/users.service";




@Resolver(Product)
export class ProductFieldsResolver {
    constructor(
        private userService: UsersService,
        private productService: ProductsService
    ) {}

    @ResolveField(() => User, {nullable : true})
    async creator(@Parent() product: Product){
        if(!product.creatorId){
            return null
        }
        try{
            return await this.userService.userGetById(product.creatorId)
        }catch(e){
            return null
        }
    }
}