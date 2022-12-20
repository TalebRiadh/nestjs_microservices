import { Args, Query, Resolver } from "@nestjs/graphql";
import { ProductsPagination, ProductsPaginationArgs } from "../../domain/dto/products-pagination.dto";
import { Product } from "../../domain/models/product";
import { ProductsService } from "apps/products/src/application/products.service";


@Resolver(Product)
export class ProductQueriesResolver{
    constructor(
        private readonly productService: ProductsService){}
    @Query(() => ProductsPagination)
    async ProductsPagination(@Args() args: ProductsPaginationArgs) {
        return this.productService.productsPagination(args)
    }
}