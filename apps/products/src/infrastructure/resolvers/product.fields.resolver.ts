import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "apps/users/src/domain/models/user";
import { Product } from "../../domain/models/product";
import { ProductsService } from "apps/products/src/application/products.service";
import { UsersService } from "apps/users/src/application/users.service";




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