import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from '../constants/services';
import {  OrderCreateInput, OrderCreateOutput } from '../domain/dto/order.create.dto';
import { Repository } from 'typeorm';
import { Order } from '../domain/models/order';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @Inject(BILLING_SERVICE)
    private billingClient: ClientProxy,

  ) {
    
  }

  async create(input: OrderCreateInput, auth: string): Promise<OrderCreateOutput>{
    const order = await this.ordersRepository.save(this.ordersRepository.create(input))
    await lastValueFrom(
      this.billingClient.emit('order_created', {input, Authentication: auth})
    )
    return {
      name: order.name,
      totalprice: order.totalprice,
      phoneNumber: order.phoneNumber
    }
  }
  async getOrders(): Promise<Order[]>{
    return this.ordersRepository.find({select:['id', 'name', 'totalprice', 'phoneNumber']})
  }

  async getOrderById(orderId: string): Promise<Order> {
    return await this.ordersRepository.findOneBy({id:orderId});
  }
}
