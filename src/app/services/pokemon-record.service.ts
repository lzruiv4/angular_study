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
  IPokemonWithNameAndFotos,
  IPokemonRecord,
  IPokemonRecordDTO,
  IPokemonRecordInList,
} from '../models/IPokemen.model';
import { PokemonService } from './pokemon.service';
import {
  POKEMON_AMOUNT,
  POKEMON_RECORDS_API,
} from '@/core/constants/API-Setting';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonRecordService {
  pokemons: IPokemonWithNameAndFotos[] = [];

  private isLoad: boolean = false;

  // For dialog
  private openDialog = new Subject<void>();
  showDialog$ = this.openDialog.asObservable();

  triggerCapturePokemonModal() {
    this.openDialog.next();
  }

  // Get all record from db
  private pokemonRecordsSubject = new BehaviorSubject<IPokemonRecord[]>([]);
  pokemonRecords$: Observable<IPokemonRecord[]> =
    this.pokemonRecordsSubject.asObservable();

  // What will be showed in table (Pokemon Lotto)
  private pokemonRecordInListSubject = new BehaviorSubject<
    IPokemonRecordInList[]
  >([]);
  pokemonRecordInList$: Observable<IPokemonRecordInList[]> =
    this.pokemonRecordInListSubject.asObservable();

  constructor(
    private pokemonRecordsHttp: HttpClient,
    private pokemonService: PokemonService,
    private authService: AuthService,
  ) {
    this.pokemonService
      .getPokemonDTOs()
      .subscribe((item) => (this.pokemons = item));
    this.getAllPokemonRecordsByCurrentUserId().subscribe();
  }

  getAllPokemonRecordsByCurrentUserId(): Observable<IPokemonRecord[]> {
    return combineLatest([
      this.pokemonRecordsHttp.get<IPokemonRecordDTO[]>(
        POKEMON_RECORDS_API + '?userId=' + this.authService.getUserId(),
      ),
      this.pokemonService.pokemons$,
    ]).pipe(
      map(([pokemonRecordDTOs, pokemonWithNameAndFotos]) =>
        pokemonRecordDTOs
          .filter((record) => !record.isRelease)
          .map((pokemonRecordDTO) => {
            const pokemon = pokemonWithNameAndFotos.find(
              (pokemon) => pokemon.id.toString() === pokemonRecordDTO.pokemonId,
            );
            return {
              pokemonCaptureRecordId: pokemonRecordDTO.pokemonCaptureRecordId,
              pokemonId: pokemonRecordDTO.pokemonId,
              captureTime: pokemonRecordDTO.captureTime,
              image: pokemon?.biggerImage ?? pokemon?.image,
              isRelease: pokemonRecordDTO.isRelease,
            } as IPokemonRecord;
          }),
      ),
      tap((record) => {
        this.pokemonRecordsSubject.next(record);
      }),
      catchError((err) => {
        console.error(
          'Something is wrong in getAllPokemonRecordsByCurrentUserId ',
        );
        throw err;
      }),
    );
  }

  getUniquePokemonCount(): Observable<number> {
    return this.pokemonRecords$.pipe(
      map((pokemonRecords) =>
        pokemonRecords.map((pokemonRecord) => pokemonRecord.pokemonId),
      ),
      map((ids) => new Set(ids).size),
    );
  }

  captureNewPokemon(): Observable<IPokemonRecord> {
    const userId = this.authService.getUserId();
    const newPokemonDTO: IPokemonRecordDTO = {
      pokemonId: (Math.floor(Math.random() * POKEMON_AMOUNT) + 1).toString(),
      userId: userId!,
    };
    return this.pokemonRecordsHttp
      .post<IPokemonRecordDTO>(POKEMON_RECORDS_API, newPokemonDTO)
      .pipe(
        map((pokemonRecordResponseDTO) => {
          return {
            pokemonCaptureRecordId:
              pokemonRecordResponseDTO.pokemonCaptureRecordId,
            pokemonId: pokemonRecordResponseDTO.pokemonId,
            captureTime: pokemonRecordResponseDTO.captureTime,
            image:
              pokemonRecordResponseDTO.pokemonCaptureRecordId !== null
                ? this.getPokemonImageUrl(pokemonRecordResponseDTO.pokemonId)
                : undefined,
            isRelease: pokemonRecordResponseDTO.isRelease,
          } as IPokemonRecord;
        }),
        tap((poke) => {
          const old = this.pokemonRecordsSubject.getValue() ?? [];
          this.pokemonRecordsSubject.next([...old, poke]);
          this.groupByRecords();
        }),
        catchError((err) => {
          console.error('Error occurred during create : ', err);
          return throwError(() => err);
        }),
      );
  }

  private groupByRecords(): Observable<IPokemonRecordInList[]> {
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
        return result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      }),
      tap((records) => this.pokemonRecordInListSubject.next(records)),
    );
  }

  getPokemonRecordsInTable() {
    this.groupByRecords().subscribe();
  }

  getPokemonImageUrl(pokemonId: string): string {
    return (
      this.pokemons.find((pokemon) => pokemonId == pokemon.id)?.biggerImage ??
      ''
    );
  }
}
