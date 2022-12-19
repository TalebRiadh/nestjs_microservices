import {  Node } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Order extends Node {
  
  @Column()
  name: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  totalprice: number;

  @Column()
  phoneNumber: string;
}

