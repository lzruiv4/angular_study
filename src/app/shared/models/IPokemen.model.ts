export interface IPokemonDTO {
  name: string;
  url: string;
}

export interface IPokemon {
  id: string;
  name: string;
  image: string;
  biggerImage: string;
}

export interface IPokemonRecordDTO {
  id: string;
  poke_id: string;
  catch_time: string;
  user_id: string;
  isRelease: boolean;
}

export interface IPokemonRecord {
  id: string;
  poke_id: string;
  catch_time: string;
  image: string;
  isRelease: boolean;
}

// export function mapDtoToModel(dto: IPokemonRecordDTO): IPokemonRecord {
//   return {
//     id: dto.id,
//     poke_id: dto.poke_id,
//     catch_time: dto.catch_time,
//     user_id: dto.user_id,
//     isRelease: dto.isRelease,
//   };
// }

// export function mapModelToDto(model: IPokemonRecord): IPokemonRecordDTO {
//   return {
//     id: model.id,
//     poke_id: model.poke_id,
//     catch_time: model.catch_time,
//     user_id: model.user_id,
//     isRelease: model.isRelease,
//   };
// }
