import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { InvoiceModel } from './entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { Inject } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerModel } from 'src/customer/entities/customer.entity';

@Resolver(() => InvoiceModel)
export class InvoiceResolver {
  constructor(
    @Inject(InvoiceService) private invoiceService: InvoiceService,
    @Inject(CustomerService) private customerService: CustomerService,
  ) {}

  @Mutation((returns) => InvoiceModel)
  async createInvoice(
    @Args('invoice') createInvoiceInput: CreateInvoiceInput,
  ): Promise<InvoiceModel> {
    return await this.invoiceService.create(createInvoiceInput);
  }

  @ResolveField((returns) => CustomerModel)
  async customer(@Parent() invoice) {
    const { customer } = invoice;
    return this.customerService.findOne(customer);
  }

  @Query((returns) => [InvoiceModel])
  async invoices(): Promise<InvoiceModel[]> {
    return await this.invoiceService.findAll();
  }

  @Query((returns) => InvoiceModel)
  async invoice(@Args('id') id: string): Promise<InvoiceModel> {
    return await this.invoiceService.findOne(id);
  }

  // @Mutation(() => InvoiceModel)
  // updateInvoice(
  //   @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput,
  // ) {
  //   return this.invoiceService.update(
  //     updateInvoiceInput.id,
  //     updateInvoiceInput,
  //   );
  // }

  // @Mutation(() => InvoiceModel)
  // removeInvoice(@Args('id', { type: () => Int }) id: number) {
  //   return this.invoiceService.remove(id);
  // }
}
