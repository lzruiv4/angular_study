import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPokemon, IPokemonDTO } from '../../../shared/models/IPokemen.model';
import { POKEMON_API } from '../../../core/constants/Pokomon.api';
import { response } from 'express';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonDTOs(): Observable<IPokemonDTO[]> {
    return this.http
      .get<{ results: IPokemonDTO[] }>(POKEMON_API)
      .pipe(map((response) => response.results));
  }
  // 或者需要做数据转换时：
  // return this.http.get<any[]>('/api/persons').pipe(
  //   map(data => data.map(p => ({
  //     ...p,
  //     birthDate: new Date(p.birthDate)
  //   })))
  // );
}
