export interface IUserDTO {
  id: string;
  firstname: string;
  lastname: string;
  poke_coin: number;
}

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  poke_coin: number;
}

export function mapDtoToModel(userDto: IUserDTO): IUser {
  return {
    id: userDto.id,
    firstname: userDto.firstname,
    lastname: userDto.lastname,
    poke_coin: userDto.poke_coin,
  };
}

export function mapModelToDto(user: IUser): IUserDTO {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    poke_coin: user.poke_coin,
  };
}
