import { Injectable } from '@angular/core';
import { RechargeService } from './recharge.service';
import { PokemonRecordService } from './pokemon-record.service';
import {
  BehaviorSubject,
  combineLatest,
  finalize,
  map,
  Observable,
  tap,
} from 'rxjs';
import { IRecord } from '@/models/ITimelineObject.model';
import { RecordType } from '@/models/enums/RecordType.enum';
import { sortArrayByDateDesc } from '@/shared/utils/DateTools';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private recordsSubject = new BehaviorSubject<IRecord[]>([]);
  records$: Observable<IRecord[]> = this.recordsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(
    private rechargeService: RechargeService,
    private pokemonRecordService: PokemonRecordService,
  ) {}

  setupRecords(type: string): Observable<IRecord[]> {
    this.loadingSubject.next(true);
    return combineLatest([
      this.rechargeService.getAllRechargeRecordsByUserId(),
      this.pokemonRecordService.getAllPokemonRecordsByCurrentUserId(),
    ]).pipe(
      map(([rechargeRecords, pokemonRecords]) => {
        const rechargeRecordMappe: IRecord[] = rechargeRecords.map(
          (rechargeRecord) => ({
            recordDate: rechargeRecord.rechargeAt!,
            recordType: RecordType.RECHARGE_RECORD,
            recordObject: rechargeRecord,
          }),
        );
        const pokemonRecordMappe: IRecord[] = pokemonRecords.map(
          (pokemonRecord) => ({
            recordDate: pokemonRecord.captureTime!,
            recordType: RecordType.POKEMON_RECORD,
            recordObject: pokemonRecord,
          }),
        );

        if (type === 'pokemon') {
          return sortArrayByDateDesc(pokemonRecordMappe);
        } else if (type === 'recharge') {
          return sortArrayByDateDesc(rechargeRecordMappe);
        } else {
          return sortArrayByDateDesc([
            ...rechargeRecordMappe,
            ...pokemonRecordMappe,
          ]);
        }
      }),
      tap((result) => this.recordsSubject.next(result)),
      finalize(() => this.loadingSubject.next(false)),
    );
  }
}
