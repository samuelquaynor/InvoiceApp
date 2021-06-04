import { InputType, Field } from '@nestjs/graphql';
import { isAlpha, isEmail, IsInt } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field()
  // @isAlpha()
  name: string;

  @Field()
  // @isEmail()
  email: string;

  @Field()
  @IsInt()
  phone: string;

  @Field()
  address: string;
}
