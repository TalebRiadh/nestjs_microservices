import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { Product } from "../models/product";
import { Pagination, PaginationArgs, PaginationSortBy, SortDirection } from "../../infrastructure/pagination/dto/pagination.dto";


@InputType()
export class ProductsPaginaionSortBy extends PaginationSortBy {
    @Field(() => SortDirection, {nullable: true})
    reference?: SortDirection
}


@ArgsType()
export class ProductsPaginationArgs extends PaginationArgs {
    @Field(() => ProductsPaginaionSortBy, {nullable: true})
    sortBy?: ProductsPaginaionSortBy
}


@ObjectType()
export class ProductsPagination extends Pagination {
    @Field(() => [Product])
    nodes: Product[]
}