import { IRecord } from '@/models/ITimelineObject.model';
import { RecordType } from '@/models/enums/RecordType.enum';
import { DATE_PIPE, sortArrayByDateDesc } from '@/shared/utils/DateTools';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { ImageComponent } from '../image/image.component';
import { RechargeService } from '@/services/recharge.service';
import { PokemonRecordService } from '@/services/pokemon-record.service';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule, NzTimelineModule, ImageComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.less',
})
export class TimelineComponent implements OnInit, OnDestroy {
  @Input() type?: string = 'custom'; // parameter for choice table type. custom or left

  destroy$ = new Subject<void>();

  recordType = RecordType;
  date_pipe = DATE_PIPE;

  combined$!: Observable<IRecord[]>;

  constructor(
    private rechargeService: RechargeService,
    private pokemonRecordService: PokemonRecordService,
  ) {}

  ngOnInit(): void {
    this.combined$ = combineLatest([
      this.rechargeService
        .getAllRechargeRecordsByUserId()
        .pipe(takeUntil(this.destroy$)),
      this.pokemonRecordService
        .getAllPokemonRecordsByCurrentUserId()
        .pipe(takeUntil(this.destroy$)),
    ]).pipe(
      takeUntil(this.destroy$),
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

        if (this.type === 'pokemon') {
          return sortArrayByDateDesc(pokemonRecordMappe);
        } else if (this.type === 'recharge') {
          return sortArrayByDateDesc(rechargeRecordMappe);
        } else {
          return sortArrayByDateDesc([
            ...rechargeRecordMappe,
            ...pokemonRecordMappe,
          ]);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
