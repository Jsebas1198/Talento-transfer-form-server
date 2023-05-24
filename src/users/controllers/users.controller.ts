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

  /**
   * @description Obtiene todos los usuarios de la base de datos
   */
  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  /**
   * @description Obtiene los detalles de un usuario específico
   * @param {string} userId ID del usuario que se desea obtener
   */
  @Get(':userId')
  getOne(@Param('userId', MongoIdPipe) userId: string) {
    return this.usersService.findOneUser(userId);
  }

  /**
   * @description Crea un nuevo usuario en la base de datos
   * @param {CreateUserDto} payload Datos del usuario a crear
   */
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }

  /**
   * @description Actualiza los datos de un usuario existente
   * @param {string} userId Id del usuario que se desea actualizar
   * @param {UpdateUserDto} payload Datos actualizados del usuario
   */
  @Put(':userId')
  update(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, payload);
  }

  /**
   * @description Elimina un usuario de la base de datos
   * @param {string} userId Id del usuario que se desea eliminar
   */
  @Delete(':userId')
  delete(@Param('userId', MongoIdPipe) userId: string) {
    return this.usersService.removeUser(userId);
  }
}
