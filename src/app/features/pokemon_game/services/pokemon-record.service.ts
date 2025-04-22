import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import {
  IPokemonRecord,
  IPokemonRecordDTO,
} from '../../../shared/models/IPokemen.model';
import { PokemonService } from './pokemon.service';
import { PokemonRecordDTOService } from './pokemon-record-dto.service';
import {
  POKEMON_AMOUNT,
  PokemonRecordsAPIByUserId,
} from '../../../core/constants/Pokomon-API';
import Dayjs from 'dayjs';
import { HttpClient } from '@angular/common/http';
import { currentUserId } from '../../../core/constants/User-API';

@Injectable({
  providedIn: 'root',
})
export class PokemonRecordService {
  private pokemonRecordsSubject = new BehaviorSubject<IPokemonRecord[]>([]);
  pokemonRecords$: Observable<IPokemonRecord[]> =
    this.pokemonRecordsSubject.asObservable();

  constructor(
    private pokemonRecordsHttp: HttpClient,
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

  captureNewPokemon(): Observable<IPokemonRecord> {
    const newPokemonDTO: IPokemonRecordDTO = {
      poke_id: (Math.floor(Math.random() * POKEMON_AMOUNT) + 1).toString(),
      catch_time: Dayjs().format('DD-MM-YYYY HH:mm:ss'),
      user_id: currentUserId,
      isRelease: false,
    };
    return this.pokemonRecordsHttp
      .post<IPokemonRecordDTO>(PokemonRecordsAPIByUserId, newPokemonDTO)
      .pipe(
        map((model) => {
          return {
            id: model.id,
            poke_id: model.poke_id,
            catch_time: model.catch_time,
            image: '',
            isRelease: model.isRelease,
          } as IPokemonRecord;
        }),
        tap((poke) => {
          console.log('You captured a ', poke.id); //TODO
          const old = this.pokemonRecordsSubject.getValue() ?? [];
          this.pokemonRecordsSubject.next([...old, poke]);
        }),
        catchError((err) => {
          console.error('Error occurred during create : ', err);
          return throwError(() => err);
        })
      );
  }
  // For dialog

  private openDialog = new Subject<void>();
  showDialog$ = this.openDialog.asObservable();

  triggerRechargeModal() {
    this.openDialog.next();
  }
}
