import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { IPokemon, IPokemonDTO } from '../../../shared/models/IPokemen.model';
import { POKEMON_API } from '../../../core/constants/Pokomon.api';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonDTOs(): Observable<IPokemon[]> {
    return this.http.get<{ results: IPokemonDTO[] }>(POKEMON_API).pipe(
      map((response) => response.results),
      switchMap((pokemonDto: IPokemonDTO[]) => {
        const requests = pokemonDto.map((pokemon) =>
          this.http.get<any>(pokemon.url).pipe(
            // tap((data) => console.log(`Get the ${pokemon.url} data:`, data)),
            map((res) => {
              return {
                id: res.id,
                name: res.name,
                image: res.sprites.other.showdown.front_default || undefined,
                biggerImage:
                  res.sprites.other.dream_world.front_default || undefined,
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
      map((results) => results.filter((p) => p !== null))
    );
  }
}
