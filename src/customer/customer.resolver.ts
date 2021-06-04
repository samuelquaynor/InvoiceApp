import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CustomerModel } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { Inject } from '@nestjs/common';
import { InvoiceService } from 'src/invoice/invoice.service';
import { InvoiceModel } from 'src/invoice/entities/invoice.entity';

@Resolver(() => CustomerModel)
export class CustomerResolver {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    @Inject(InvoiceService) private invoiceService: InvoiceService,
  ) {}

  @Query((returns) => CustomerModel)
  async customer(@Args('id') id: string): Promise<CustomerModel> {
    return await this.customerService.findOne(id);
  }

  @ResolveField((returns) => [InvoiceModel])
  async invoices(@Parent() customer) {
    const { id } = customer;
    console.log(customer);
    return this.invoiceService.findByCustomer(id);
  }

  @Query((returns) => [CustomerModel])
  async customers(): Promise<CustomerModel[]> {
    return await this.customerService.findAll();
  }

  @Mutation(() => CustomerModel)
  createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    return this.customerService.create(createCustomerInput);
  }

  // @Mutation(() => CustomerModel)
  // updateCustomer(
  //   @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  // ) {
  //   return this.customerService.update(
  //     updateCustomerInput.id,
  //     updateCustomerInput,
  //   );
  // }

  // @Mutation(() => CustomerModel)
  // removeCustomer(@Args('id', { type: () => Int }) id: number) {
  //   return this.customerService.remove(id);
  // }
}
