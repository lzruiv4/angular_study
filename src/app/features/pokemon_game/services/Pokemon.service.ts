import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { IPokemon, IPokemonDTO } from '../../../shared/models/IPokemen.model';
import { POKEMON_API } from '../../../core/constants/Pokomon-API';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private pokemonsSubject = new BehaviorSubject<IPokemon[]>([]);
  pokemons$: Observable<IPokemon[]> = this.pokemonsSubject.asObservable();

  constructor(private pokemonHttp: HttpClient) {}

  getPokemonDTOs(): Observable<IPokemon[]> {
    return this.pokemonHttp.get<{ results: IPokemonDTO[] }>(POKEMON_API).pipe(
      map((response) => response.results),
      switchMap((pokemonDto: IPokemonDTO[]) => {
        const requests = pokemonDto.map((pokemon) =>
          this.pokemonHttp.get<any>(pokemon.url).pipe(
            map((res) => {
              // console.log('asdf', res);
              return {
                id: res.id,
                name: res.name,
                // TODO:
                // image:
                //   res.sprites.other.showdown.front_default || undefined,
                image:
                  res.sprites.other.showdown.front_default.replace(
                    'https://raw.githubusercontent.com/PokeAPI/sprites/',
                    'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@'
                  ) || undefined,
                // biggerImage:
                //   res.sprites.other.dream_world.front_default || undefined
                biggerImage:
                  res.sprites.other.dream_world.front_default.replace(
                    'https://raw.githubusercontent.com/PokeAPI/sprites/',
                    'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@'
                  ) || undefined,
              } as IPokemon;
            }),
            catchError((error) => {
              console.error('There is an error in the request data.', error);
              return of(null);
            })
          )
        );
        return forkJoin(requests);
      }),
      map((results) => results.filter((p) => p !== null)),
      tap((pokemon) => this.pokemonsSubject.next(pokemon))
    );
  }
}
