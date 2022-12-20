import {
    IsNotEmpty,
    IsPhoneNumber,
    IsPositive,
    IsString,
  } from 'class-validator';


  export class OrderCreateInput {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsPositive()
    totalprice: number;
  
    @IsPhoneNumber()
    phoneNumber: string;
  }

  export class OrderCreateOutput {
    name: string
    totalprice: number
    phoneNumber: string
  }