import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInfoComponent } from '../user/user-info/user-info.component';
import { PokemonRecordService } from '@/services/pokemon-record.service';
import { RechargeService } from '@/services/recharge.service';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { IRechargeRecord } from '@/models/IRechargeRecord.model';
import { IPokemonRecord } from '@/models/IPokemen.model';
import { TimelineComponent } from '@/shared/base-components/timeline/timeline.component';
import { IRecord } from '@/models/ITimelineObject.model';
import { RecordType } from '@/models/enums/RecordType.enum';
import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [UserInfoComponent, TimelineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  rechargeRecords$!: Observable<IRechargeRecord[]>;
  pokemonRecords$!: Observable<IPokemonRecord[]>;

  combined$!: Observable<IRecord[]>;
  captured$!: Observable<number>;

  constructor(
    private rechargeService: RechargeService,
    private pokemonRecordService: PokemonRecordService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (this.authService.getUserId()) {
      this.userService.getUserInfo().pipe(takeUntil(this.destroy$)).subscribe();
      this.combined$ = combineLatest([
        (this.rechargeRecords$ =
          this.rechargeService.getAllRechargeRecordsByUserId()),
        (this.pokemonRecords$ =
          this.pokemonRecordService.getAllPokemonRecordsByCurrentUserId()),
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
          return [...rechargeRecordMappe, ...pokemonRecordMappe].sort(
            (a, b) =>
              new Date(b.recordDate).getTime() -
              new Date(a.recordDate).getTime(),
          );
        }),
      );
      this.captured$ = this.pokemonRecordService
        .getUniquePokemonCount()
        .pipe(takeUntil(this.destroy$));
    } else {
      console.warn('User info is loading...');
    }
  }

  get user$() {
    return this.userService.user$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
