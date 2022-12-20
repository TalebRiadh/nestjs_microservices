import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../domain/models/product';
import { Repository } from 'typeorm'
import { SortDirection } from '../infrastructure/pagination/dto/pagination.dto';
import {ProductCreateInput, 
        ProductCreateOutput, 
        ProductUpdateInput, 
        ProductUpdateOutput, 
        ProductDeleteOutuput, 
        
        ProductsPaginationArgs,
        ProductsPagination, 
        } from '../domain/dto/index';
        
import { JWTPayload } from 'apps/auth/src/application/auth.service';
import { User } from 'apps/users/src/domain/models/user';


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ){}


    async productCreate(
        user:JWTPayload,
        input: ProductCreateInput
        ): Promise<ProductCreateOutput> 
    {
        const new_product = this.productsRepository.create(input)
        new_product.creator = new User()
        new_product.creator.id = user.id
        const product = await this.productsRepository.save(new_product)
        return { product }
    }

    async productUpdate(
        productId: Product['id'],
        input: ProductUpdateInput,
    )   : Promise<ProductUpdateOutput> {
        const product = await this.productsRepository.findOneByOrFail({id: productId})
        product.reference = input.reference
        product.description = input.description
        product.price = input.price
        product.available = input.available
        await product.save();
        return {product}
    }

    async productDelete(
        productId: Product['id']
    ): Promise<ProductDeleteOutuput>{
        const product = await this.productsRepository.findOneByOrFail({id: productId})
        await product.remove()
        return {productId}
    }

    async productsPagination(args: ProductsPaginationArgs): Promise<ProductsPagination> {
        const qb = this.productsRepository.createQueryBuilder('product')
        qb.take(args.take)
        qb.skip(args.skip)
        if(args.sortBy){
            if(args.sortBy.created_at !== null){
                qb.addOrderBy(
                    'product.created_at',
                    args.sortBy.created_at === SortDirection.ASC ? "ASC" : "DESC"
                )
            }
            if(args.sortBy.reference !== null){
                qb.addOrderBy(
                    'product.title',
                    args.sortBy.reference === SortDirection.ASC ? "ASC" : "DESC"
                )
            }
        }
        const [nodes, totalCount] = await qb.getManyAndCount()
        return { nodes, totalCount }
    }
}
