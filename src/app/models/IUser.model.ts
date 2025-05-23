export interface IUserDTO {
  userId?: string;
  username: string;
  password?: string;
  createdAt?: Date;
  firstname: string;
  lastname: string;
  pokemonCoin: number;
}

export interface IUser {
  id?: string;
  username: string;
  password?: string;
  createdAt?: Date;
  firstname: string;
  lastname: string;
  pokemonCoin: number;
}

export function mapDtoToModel(userDto: IUserDTO): IUser {
  return {
    id: userDto.userId,
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
    userId: user.id,
    username: user.username,
    password: user.password,
    firstname: user.firstname,
    createdAt: user.createdAt,
    lastname: user.lastname,
    pokemonCoin: user.pokemonCoin,
  };
}
