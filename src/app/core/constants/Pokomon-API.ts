import { currentUserId } from './User-API';

export const POKEMON_AMOUNT = 500;
export const POKEMON_API =
  'https://pokeapi.co/api/v2/pokemon?limit=' + POKEMON_AMOUNT;

export const PokemonRecordsAPIByUserId =
  'http://localhost:9009/pokemonRecords?user_id=' + currentUserId;
