import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { OrderCreateInput, OrderCreateOutput } from './dto/order.create.dto';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';
import { Order } from './schemas/order.schema';

@Controller('orders')
@ApiBearerAuth()
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('')
  @ApiResponse({ status: 200, description: 'create order successfully' })
  @ApiResponse({ status: 400, description: 'Error in create order' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: OrderCreateInput, @Req() req: any): Promise<OrderCreateOutput>
  {
    try{
      return this.ordersService.create(request, req.cookies?.Authentication);
    }catch(err){
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all orders' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  async getOrders(): Promise <Order[]> {
    try{
      return await this.ordersService.getOrders();
    }catch(err){
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one order' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  async getOrderbyId(@Param('id')id: string): Promise<Order> {
    try{
      return await this.ordersService.getOrderById(id);

    }catch(err){
      throw new HttpException(
        err.message,
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
