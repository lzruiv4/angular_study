// person.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPokemonRecordDTO } from '../../../shared/models/IPokemen.model';
import { HttpClient } from '@angular/common/http';
import { PokemonRecordsAPIByUserId } from '../../../core/constants/Pokomon-API';

@Injectable({
  providedIn: 'root',
})
export class PokemonRecordDTOService {
  private pokemonRecordDTOsSubject = new BehaviorSubject<IPokemonRecordDTO[]>(
    []
  );
  pokemonRecordDTOs$: Observable<IPokemonRecordDTO[]> =
    this.pokemonRecordDTOsSubject.asObservable();

  constructor(private pokemonRecordHttp: HttpClient) {}

  getAllPokemonRecordDTOsByCurrentUserId(): Observable<IPokemonRecordDTO[]> {
    return this.pokemonRecordHttp
      .get<IPokemonRecordDTO[]>(PokemonRecordsAPIByUserId)
      .pipe(tap((data) => this.pokemonRecordDTOsSubject.next(data)));
  }
}
