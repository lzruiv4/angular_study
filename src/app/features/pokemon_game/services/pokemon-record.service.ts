// person.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPokemonRecord } from '../../../shared/models/IPokemen.model';
import { HttpClient } from '@angular/common/http';
import { PokemonRecordsAPIByUserId } from '../../../core/constants/Pokomon-API';

@Injectable({
  providedIn: 'root',
})
export class PokemonRecordService {
  private pokemonRecordsSubject = new BehaviorSubject<IPokemonRecord[]>([]);
  pokemonRecords$: Observable<IPokemonRecord[]> =
    this.pokemonRecordsSubject.asObservable();

  constructor(private pokemonRecordHttp: HttpClient) {}

  getAllPokemonRecordsByCurrentUserId(): Observable<IPokemonRecord[]> {
    return this.pokemonRecordHttp
      .get<IPokemonRecord[]>(PokemonRecordsAPIByUserId)
      .pipe(tap((data) => this.pokemonRecordsSubject.next(data)));
  }
}
