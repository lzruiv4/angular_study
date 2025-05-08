import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from '../../features/user/components/user-info/user-info.component';
import { PokemonRecordService } from '@/features/pokemon_game/services/pokemon-record.service';
import { RechargeService } from '@/features/user/service/recharge.service';
import { combineLatest, map, Observable } from 'rxjs';
import { IRechargeRecord } from '@/shared/models/IRechargeRecord.model';
import { IPokemonRecord } from '@/shared/models/IPokemen.model';
import { TimelineComponent } from '@/shared/components/timeline/timeline.component';
import { IRecord } from '@/shared/models/ITimelineObject.model';

@Component({
  selector: 'app-home',
  imports: [UserInfoComponent, TimelineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  rechargeRecords$!: Observable<IRechargeRecord[]>;
  pokemonRecords$!: Observable<IPokemonRecord[]>;

  combined$!: Observable<IRecord[]>;

  constructor(
    private rechargeService: RechargeService,
    private pokemonRecordService: PokemonRecordService
  ) {}

  ngOnInit(): void {
    this.combined$ = combineLatest([
      (this.rechargeRecords$ =
        this.rechargeService.getAllRechargeRecordsByUserId()),
      (this.pokemonRecords$ =
        this.pokemonRecordService.getAllPokemonRecordsByCurrentUserId()),
    ]).pipe(
      map(([rechargeRecords, pokemonRecords]) => {
        const rechargeRecordMappe: IRecord[] = rechargeRecords.map(
          (rechargeRecord) => ({
            homeObjectDate: rechargeRecord.rechargeAt!,
            homeObjectType: 'RECHARGE_RECORD',
            homeObject: rechargeRecord,
          })
        );
        const pokemonRecordMappe: IRecord[] = pokemonRecords.map(
          (pokemonRecord) => ({
            homeObjectDate: pokemonRecord.captureTime!,
            homeObjectType: 'POKEMON_RECORD',
            homeObject: pokemonRecord,
          })
        );
        return [...rechargeRecordMappe, ...pokemonRecordMappe].sort(
          (a, b) =>
            new Date(b.homeObjectDate).getTime() -
            new Date(a.homeObjectDate).getTime()
        );
      })
    );
  }
}
