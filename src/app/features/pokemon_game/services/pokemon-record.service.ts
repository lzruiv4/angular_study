// person.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { IPokemonRecord } from '../../../shared/models/IPokemen.model';
import { PokemonService } from './pokemon.service';
import { PokemonRecordDTOService } from './pokemon-record-dto.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonRecordService {
  private pokemonRecordsSubject = new BehaviorSubject<IPokemonRecord[]>([]);
  pokemonRecords$: Observable<IPokemonRecord[]> =
    this.pokemonRecordsSubject.asObservable();

  constructor(
    private pokemonRecordDTOService: PokemonRecordDTOService,
    private pokemonService: PokemonService
  ) {
    this.pokemonRecordDTOService
      .getAllPokemonRecordDTOsByCurrentUserId()
      .subscribe();
    this.pokemonService.getPokemonDTOs().subscribe();
  }

  getAllPokemonRecordsByCurrentUserId(): Observable<IPokemonRecord[]> {
    return combineLatest([
      this.pokemonRecordDTOService.pokemonRecordDTOs$,
      this.pokemonService.pokemons$,
    ]).pipe(
      map(([pokemonRecordDTOs, pokemons]) =>
        pokemonRecordDTOs.map((pokemonRecordDTO) => {
          const imageUrl = pokemons.find(
            (pokemon) => pokemon.id.toString() === pokemonRecordDTO.poke_id
          )?.image;
          return {
            id: pokemonRecordDTO.id,
            poke_id: pokemonRecordDTO.poke_id,
            catch_time: pokemonRecordDTO.catch_time,
            image: imageUrl,
            isRelease: pokemonRecordDTO.isRelease,
          } as IPokemonRecord;
        })
      ),
      tap((record) => this.pokemonRecordsSubject.next(record))
    );
  }
}
