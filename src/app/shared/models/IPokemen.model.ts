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
export interface IPokemonRecord {
  id: string;
  poke_id: string;
  catch_time: string;
  user_id: string;
  isDeleted: boolean;
}
