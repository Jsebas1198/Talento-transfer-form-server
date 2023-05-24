import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  getOne(@Param('userId', MongoIdPipe) userId: string) {
    return this.usersService.findOneUser(userId);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }

  @Put(':userId')
  update(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId', MongoIdPipe) userId: string) {
    return this.usersService.removeUser(userId);
  }
}
