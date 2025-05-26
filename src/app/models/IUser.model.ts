import { RoleType } from './enums/RoleType.enum';

export interface IUser {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  pokemonCoin: number;
  createdAt?: Date;
  roles: RoleType[];
}

export interface IUserDTO {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  // password?: string; // for password update
  createdAt?: Date;
  pokemonCoin: number;
  roles: RoleType[];
}

export interface IPasswordUpdateDTO {
  oldPassword: string;
  newPassword: string;
}

export function mapDtoToModel(userDto: IUserDTO): IUser {
  return {
    userId: userDto.userId,
    username: userDto.username,
    firstname: userDto.firstname,
    lastname: userDto.lastname,
    pokemonCoin: userDto.pokemonCoin,
    createdAt: userDto.createdAt,
    roles: userDto.roles,
  };
}
