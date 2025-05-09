export interface IUserDTO {
  id?: string;
  username: string;
  password?: string;
  createdAt?: Date;
  firstname: string;
  lastname: string;
  pokemonCoin: number;
}

export interface IUser {
  userId?: string;
  username: string;
  password?: string;
  createdAt?: Date;
  firstname: string;
  lastname: string;
  pokemonCoin: number;
}

export function mapDtoToModel(userDto: IUserDTO): IUser {
  return {
    userId: userDto.id,
    username: userDto.username,
    password: userDto.password,
    firstname: userDto.firstname,
    createdAt: userDto.createdAt,
    lastname: userDto.lastname,
    pokemonCoin: userDto.pokemonCoin,
  };
}

export function mapModelToDto(user: IUser): IUserDTO {
  return {
    id: user.userId,
    username: user.username,
    password: user.password,
    firstname: user.firstname,
    createdAt: user.createdAt,
    lastname: user.lastname,
    pokemonCoin: user.pokemonCoin,
  };
}
