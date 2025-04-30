export interface IUserDTO {
  userId: string;
  username: string;
  createdAt: Date;
  firstname: string;
  lastname: string;
  pokemonCoin: number;
}

export interface IUser {
  userId: string;
  username: string;
  createdAt: Date;
  firstname: string;
  lastname: string;
  pokemonCoin: number;
}

export function mapDtoToModel(userDto: IUserDTO): IUser {
  return {
    userId: userDto.userId,
    username: userDto.username,
    firstname: userDto.firstname,
    createdAt: userDto.createdAt,
    lastname: userDto.lastname,
    pokemonCoin: userDto.pokemonCoin,
  };
}

export function mapModelToDto(user: IUser): IUserDTO {
  return {
    userId: user.userId,
    username: user.username,
    firstname: user.firstname,
    createdAt: user.createdAt,
    lastname: user.lastname,
    pokemonCoin: user.pokemonCoin,
  };
}
