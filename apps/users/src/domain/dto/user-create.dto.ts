import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "../models/user";


@ObjectType()
export class UserCreateOutput {
    @Field(() => User)
    user: User
}


@InputType()
export class UserCreateInput{
    
    @Field(() => String)
    email: string
    
    @Field(() => String)
    username: string

    @Field(() => String)
    password: string

}