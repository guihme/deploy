import {
    Body,
    Controller,
    Get,
    Post,
    Res,
  } from '@nestjs/common';
  import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { Response } from 'express';
  import { CreateCustomerProps } from 'src/entity';
  import { BodyCreateOptions } from './customer.schema';
  import { CustomerService } from './customer.service';
  import { CustomerDTO } from 'src/DTO';
  
  @ApiTags('customers')
  @Controller('customers')
  export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }
  
    @ApiOperation({ summary: 'List all Customers' })
    @Get()
    async all(@Res() res: Response) {
      const result = await this.customerService.getAll();
      if (result.isFailure) {
        res.status(400).send(result.errorValue());
        return;
      }
  
      let customers = result.getValue();
      let customersDTO: CustomerDTO[] = [];
  
      for (let customer of customers) {
        customersDTO.push(customer.toDTO());
      }
  
      res.status(200).send(customersDTO);
    }
  
    @ApiOperation({ summary: 'Create an Customer' })
    @ApiBody(BodyCreateOptions)
    @Post()
    async create(@Body() body: CreateCustomerProps, @Res() res: Response) {
      const result = await this.customerService.createAndSave(body);
      if (result.isFailure) {
        res.status(400).send(result.errorValue());
        return;
      }
      const customer = result.getValue();
  
      res.status(200).send(customer.toDTO());
    }
  }