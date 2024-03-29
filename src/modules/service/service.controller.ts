import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateServiceProps } from 'src/entity';
import { BodyCreateOptions } from './service.schema';
import { ServiceService } from './service.service';
import { ServiceDTO } from 'src/DTO';

@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @ApiOperation({ summary: 'List all Services' })
  @Get()
  async all(@Res() res: Response) {
    const result = await this.serviceService.getAll();
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    let services = result.getValue();
    let servicesDTO: ServiceDTO[] = [];

    for (let service of services) {
      servicesDTO.push(service.toDTO());
    }

    res.status(200).send(servicesDTO);
  }

  @ApiOperation({ summary: 'Get a Service' })
  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response) {
    const result = await this.serviceService.findOne(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const service = result.getValue();

    res.status(200).send(service.toDTO());
  }

  @ApiOperation({ summary: 'Create a Service' })
  @ApiBody(BodyCreateOptions)
  @Post()
  async create(@Body() body: CreateServiceProps, @Res() res: Response) {
    const result = await this.serviceService.createAndSave(body);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const service = result.getValue();

    res.status(200).send(service.toDTO());
  }

  @ApiOperation({ summary: 'update a Service' })
  @ApiBody(BodyCreateOptions)
  @Put(":id")
  async update(
    @Body() body: CreateServiceProps,
    @Param("id") id: string,
    @Res() res: Response) {
    const result = await this.serviceService.update(id, body);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const service = result.getValue();

    res.status(200).send(service.toDTO());
  }

  @ApiOperation({ summary: "Remove a Service" })
  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res: Response) {
    const result = await this.serviceService.delete(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    res.status(200).send();
  }
}
