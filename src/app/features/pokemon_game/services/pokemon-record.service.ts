import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  Subject,
  take,
  tap,
  throwError,
} from 'rxjs';
import {
  IPokemon,
  IPokemonRecord,
  IPokemonRecordDTO,
  IPokemonRecordInList,
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
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonRecordService {
  pokemons: IPokemon[] = [];

  // Get all record from db
  private pokemonRecordsSubject = new BehaviorSubject<IPokemonRecord[]>([]);
  pokemonRecords$: Observable<IPokemonRecord[]> =
    this.pokemonRecordsSubject.asObservable();

  // Type, what will be showed in table
  private pokemonRecordInListSubject = new BehaviorSubject<
    IPokemonRecordInList[]
  >([]);
  pokemonRecordInList$: Observable<IPokemonRecordInList[]> =
    this.pokemonRecordInListSubject.asObservable();

  constructor(
    private pokemonRecordsHttp: HttpClient,
    private pokemonRecordDTOService: PokemonRecordDTOService,
    private pokemonService: PokemonService
  ) {
    this.pokemonRecordDTOService
      .getAllPokemonRecordDTOsByCurrentUserId()
      .subscribe();
    this.pokemonService
      .getPokemonDTOs()
      .subscribe((item) => (this.pokemons = item));
    this.getAllPokemonRecordsByCurrentUserId().subscribe();
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
            image:
              model.id !== null ? this.getPokemonImageUrl(model.poke_id) : '',
            isRelease: model.isRelease,
          } as IPokemonRecord;
        }),
        tap((poke) => {
          console.log('You captured a ', poke.id); //TODO
          const old = this.pokemonRecordsSubject.getValue() ?? [];
          this.pokemonRecordsSubject.next([...old, poke]);
          this.groupByRecords();
        }),
        catchError((err) => {
          console.error('Error occurred during create : ', err);
          return throwError(() => err);
        })
      );
  }

  groupByRecords(): Observable<IPokemonRecordInList[]> {
    return this.pokemonRecords$.pipe(
      map((records) => {
        const map = new Map<string, IPokemonRecord[]>();
        records.forEach((record) => {
          const date_temp = record.catch_time.split(' ')[0];
          const group = map.get(date_temp) || [];
          group.push(record);
          map.set(date_temp, group);
        });

        const result: IPokemonRecordInList[] = [];
        map.forEach((pokemonRecordsInTheSameDay, date) => {
          result.push({ date, pokemonRecordsInTheSameDay });
        });
        console.log(result);
        return result.sort(
          (a, b) =>
            dayjs(b.date, 'DD-MM-YYYY').valueOf() -
            dayjs(a.date, 'DD-MM-YYYY').valueOf()
        );
      })
    );
  }

  getPokemonImageUrl(pokemonId: string): string {
    return (
      this.pokemons.find((pokemon) => pokemonId == pokemon.id)?.image ?? ''
    );
  }

  // For dialog
  private openDialog = new Subject<void>();
  showDialog$ = this.openDialog.asObservable();

  triggerRechargeModal() {
    this.openDialog.next();
  }
}
