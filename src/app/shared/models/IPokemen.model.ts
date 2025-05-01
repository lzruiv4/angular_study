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
  id?: string;
  pokemonId: string;
  captureTime?: Date;
  userId: string;
  isRelease?: boolean;
}

export interface IPokemonRecord {
  pokemonCaptureRecordId?: string;
  pokemonId: string;
  captureTime?: Date;
  image: string;
  isRelease?: boolean;
}

export interface IPokemonRecordInList {
  date: string;
  pokemonRecordsInTheSameDay: IPokemonRecord[];
}
