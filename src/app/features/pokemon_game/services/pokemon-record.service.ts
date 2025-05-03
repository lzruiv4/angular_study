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
  IPokemon,
  IPokemonRecord,
  IPokemonRecordDTO,
  IPokemonRecordInList,
} from '../../../shared/models/IPokemen.model';
import { PokemonService } from './Pokemon.service';
import {
  POKEMON_AMOUNT,
  POKEMON_RECORDS_API,
} from '../../../core/constants/Pokomon-API';
import Dayjs from 'dayjs';
import { HttpClient } from '@angular/common/http';
import { CURRENT_USER_ID } from '../../../core/constants/User-API';
import dayjs from 'dayjs';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class PokemonRecordService {
  pokemons: IPokemon[] = [];

  constructor(
    private pokemonRecordsHttp: HttpClient,
    private pokemonService: PokemonService
  ) {
    this.pokemonService
      .getPokemonDTOs()
      .subscribe((item) => (this.pokemons = item));
    this.getAllPokemonRecordsByCurrentUserId().subscribe();
  }

  // Get all record from db
  private pokemonRecordsSubject = new BehaviorSubject<IPokemonRecord[]>([]);
  pokemonRecords$: Observable<IPokemonRecord[]> =
    this.pokemonRecordsSubject.asObservable();

  getAllPokemonRecordsByCurrentUserId(): Observable<IPokemonRecord[]> {
    return combineLatest([
      this.pokemonRecordsHttp.get<IPokemonRecordDTO[]>(
        POKEMON_RECORDS_API + '?userId=' + CURRENT_USER_ID
      ),
      this.pokemonService.pokemons$,
    ]).pipe(
      map(([pokemonRecordDTOs, pokemons]) =>
        pokemonRecordDTOs.map((pokemonRecordDTO) => {
          const imageUrl = pokemons.find(
            (pokemon) => pokemon.id.toString() === pokemonRecordDTO.pokemonId
          )?.image;
          return {
            pokemonCaptureRecordId: pokemonRecordDTO.id,
            pokemonId: pokemonRecordDTO.pokemonId,
            captureTime: pokemonRecordDTO.captureTime,
            image: imageUrl,
            isRelease: pokemonRecordDTO.isRelease,
          } as IPokemonRecord;
        })
      ),
      tap((record) => {
        // console.log('ppp: ', record);
        this.pokemonRecordsSubject.next(record);
      }),
      catchError((err) => {
        console.error(
          'Something is wrong in getAllPokemonRecordsByCurrentUserId '
        );
        throw err;
      })
    );
  }

  getUniquePokemonCount(): Observable<number> {
    return this.pokemonRecords$.pipe(
      map((pokemonRecords) =>
        pokemonRecords.map((pokemonRecord) => pokemonRecord.pokemonId)
      ),
      map((ids) => new Set(ids).size)
    );
  }

  captureNewPokemon(): Observable<IPokemonRecord> {
    const newPokemonDTO: IPokemonRecordDTO = {
      pokemonId: (Math.floor(Math.random() * POKEMON_AMOUNT) + 1).toString(),
      captureTime: new Date(),
      userId: CURRENT_USER_ID,
      isRelease: false,
    };
    console.log('123sss : ', newPokemonDTO);
    return this.pokemonRecordsHttp
      .post<IPokemonRecordDTO>(POKEMON_RECORDS_API, newPokemonDTO)
      .pipe(
        map((model) => {
          return {
            pokemonCaptureRecordId: model.id,
            pokemonId: model.pokemonId,
            captureTime: model.captureTime,
            image:
              model.id !== null ? this.getPokemonImageUrl(model.pokemonId) : '',
            isRelease: model.isRelease,
          } as IPokemonRecord;
        }),
        tap((poke) => {
          console.log('You captured a ', poke.pokemonId); //TODO
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

  // What will be showed in table (Pokemon Lotto)
  private pokemonRecordInListSubject = new BehaviorSubject<
    IPokemonRecordInList[]
  >([]);
  pokemonRecordInList$: Observable<IPokemonRecordInList[]> =
    this.pokemonRecordInListSubject.asObservable();

  groupByRecords(): Observable<IPokemonRecordInList[]> {
    return this.pokemonRecords$.pipe(
      map((records) => {
        const map = new Map<string, IPokemonRecord[]>();
        records.forEach((record) => {
          const date_temp = record.captureTime!.toString().split('T')[0];
          const group = map.get(date_temp) || [];
          group.push(record);
          map.set(date_temp, group);
        });

        const result: IPokemonRecordInList[] = [];
        map.forEach((pokemonRecordsInTheSameDay, date) => {
          result.push({ date, pokemonRecordsInTheSameDay });
        });
        // console.log('asd', result);
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
