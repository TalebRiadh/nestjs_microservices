import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserCreateInput, UserCreateOutput } from "../../domain/dto/user-create.dto";
import { User } from "../../domain/models/user";
import { UsersService } from "apps/users/src/application/users.service";


@Resolver(User)
export class UserMutationsResolver{
    constructor(private readonly userService: UsersService){}

    @Mutation(()=> UserCreateOutput)
    async userCreate(@Args('input') input: UserCreateInput){
        return this.userService.userCreate(input)
    }
}