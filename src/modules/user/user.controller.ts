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
import { CreateUserProps } from 'src/entity';
import { BodyCreateOptions } from './user.schema';
import { UserService } from './user.service';
import { UserDTO } from 'src/DTO';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'List all Users' })
  @Get()
  async all(@Res() res: Response) {
    const result = await this.userService.getAll();
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    let users = result.getValue();
    let usersDTO: UserDTO[] = [];

    for (let user of users) {
      usersDTO.push(user.toDTO());
    }

    res.status(200).send(usersDTO);
  }

  @ApiOperation({ summary: 'Create an User' })
  @ApiBody(BodyCreateOptions)
  @Post()
  async create(@Body() body: CreateUserProps, @Res() res: Response) {
    const result = await this.userService.createAndSave(body);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const user = result.getValue();
    
    res.status(200).send(user.toDTO());
  }

  @ApiOperation({ summary: 'Get an User' })
  @Get(":id")
  async findOne(@Param("id") id: string, @Res() res: Response){
    const result = await this.userService.findOne(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const user = result.getValue();

    res.status(200).send(user.toDTO());
  }

  @ApiOperation({ summary: 'Update an User' })
  @ApiBody(BodyCreateOptions)
  @Put(":id")
  async update(
    @Body() data: CreateUserProps,
    @Param("id") id: string,
    @Res() res: Response
  ) {
    const result = await this.userService.update(data, id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }
    const user = result.getValue();

    res.status(200).send(user.toDTO());
  }

  @ApiOperation({ summary: "Remove an User" })
  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res: Response) {
    const result = await this.userService.delete(id);
    if (result.isFailure) {
      res.status(400).send(result.errorValue());
      return;
    }

    res.status(200).send();
  }
}
