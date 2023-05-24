import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { CloudinaryService } from '../../cloudinary/services/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  /**
   * @description Muestra todos los usuarios de la  bbdd
   * @returns {Promise<User[]>} Lista de todos los usuarios de la base de datos
   */
  async getAllUsers() {
    return await this.userModel.find().exec();
  }

  /**
   * @description Muestra a un usuario de la bbdd
   * @param {string} id Id del usuario que se desea encontrar
   * @returns {Promise<User>} Detalles del usuario solicitado
   */
  async findOneUser(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  /**
   * @description Crea a un usuario en la bbdd
   * @param {CreateUserDto} data Informacion del usuario a ser creado
   * @returns {Promise<User>} Usuario creado
   */
  async createUser(data: CreateUserDto) {
    const { photo } = data;
    const photoUrl = await this.cloudinaryService.uploadImage(photo);
    const newUser = new this.userModel({
      ...data,
      photo: photoUrl.url,
    });

    return await newUser.save();
  }

  /**
   * @description Modifica a un usuario de la bbdd
   * @param {string} id Id del usuario que se desea encontrar
   * @param {UpdateUserDto} changes Cambios que se van a aplicar al usuario
   * @returns {Promise<User>} Usuario actualizado
   */
  async updateUser(id: string, changes: UpdateUserDto) {
    const { photo } = changes;
    let photoUrl: any = '';
    if (photo) {
      photoUrl = await this.cloudinaryService.uploadImage(photo);
    }
    const user = this.userModel
      .findByIdAndUpdate(
        id,
        { $set: { ...changes, photo: photoUrl?.url ?? photo } },
        { new: true },
      )
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  /**
   * @description Elimina a un usuario de la bbdd
   * @param {string} id Id del usuario que se desea eliminar
   * @returns {Promise<Void>} Usuario eliminado
   */
  async removeUser(id: string) {
    const userToDelete = await this.userModel.findByIdAndRemove(id);

    if (!userToDelete) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
