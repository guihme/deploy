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
  import { CreateSchedulingProps } from 'src/entity';
  import { BodyCreateOptions } from './scheduling.schema';
  import { SchedulingService } from './scheduling.service';
  import { SchedulingDTO } from 'src/DTO';
  
  @ApiTags('scheduling')
  @Controller('scheduling')
  export class SchedulingController {
    constructor(private readonly schedulingService: SchedulingService) { }
  
    @ApiOperation({ summary: 'List all Schedule' })
    @Get()
    async all(@Res() res: Response) {
      const result = await this.schedulingService.getAll();
      if (result.isFailure) {
        res.status(400).send(result.errorValue());
        return;
      }
  
      let scheduling = result.getValue();
      let schedulingDTO:SchedulingDTO[] = [];
  
      for (let schedule of scheduling) {
        schedulingDTO.push(schedule.toDTO());
      }
  
      res.status(200).send(schedulingDTO);
    }
  
    @ApiOperation({ summary: 'Create a Schedule' })
    @ApiBody(BodyCreateOptions)
    @Post()
    async create(@Body() body: CreateSchedulingProps, @Res() res: Response) {
      const result = await this.schedulingService.createAndSave(body);
      if (result.isFailure) {
        res.status(400).send(result.errorValue());
        return;
      }
      const schedule = result.getValue();

      res.status(200).send(schedule.toDTO());
    }

    @ApiOperation({ summary: 'Get a Schedule' })
    @Get(":id")
    async findOne(@Param("id") id: string, @Res() res: Response){
      const result = await this.schedulingService.findOne(id);
      if (result.isFailure) {
        res.status(400).send(result.errorValue());
        return;
      }
      const schedule = result.getValue();
  
      res.status(200).send(schedule.toDTO());
    }
  
    @ApiOperation({ summary: 'Update a Schedule' })
    @ApiBody(BodyCreateOptions)
    @Put(":id")
    async update(
      @Body() data: CreateSchedulingProps,
      @Param("id") id: string,
      @Res() res: Response
    ) {
      const result = await this.schedulingService.update(data, id);
      if (result.isFailure) {
        res.status(400).send(result.errorValue());
        return;
      }
      const schedule = result.getValue();
  
      res.status(200).send(schedule.toDTO());
    }
  
    @ApiOperation({ summary: "Remove a Schedule" })
    @Delete(":id")
    async remove(@Param("id") id: string, @Res() res: Response) {
      const result = await this.schedulingService.delete(id);
      if (result.isFailure) {
        res.status(400).send(result.errorValue());
        return;
      }
  
      res.status(200).send();
    }

  }
