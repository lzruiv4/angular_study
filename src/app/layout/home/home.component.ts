import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from '../../features/user/components/user-info/user-info.component';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PokemonRecordService } from '@/features/pokemon_game/services/pokemon-record.service';
import { RechargeService } from '@/features/user/service/recharge.service';
import { combineLatest, map, Observable } from 'rxjs';
import { IRechargeRecord } from '@/shared/models/IRechargeRecord.model';
import { IPokemonRecord } from '@/shared/models/IPokemen.model';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DATE_PIPE } from '@/shared/utils/DateTools';

type HomeObject =
  | {
      homeObjectDate: Date;
      homeObjectType: 'RECHARGE_RECORD';
      homeObject: IRechargeRecord;
    }
  | {
      homeObjectDate: Date;
      homeObjectType: 'POKEMON_RECORD';
      homeObject: IPokemonRecord;
    };

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    UserInfoComponent,
    NzTimelineModule,
    NzIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  rechargeRecords$!: Observable<IRechargeRecord[]>;
  pokemonRecords$!: Observable<IPokemonRecord[]>;

  combined$!: Observable<HomeObject[]>;

  date_pipe = DATE_PIPE;

  constructor(
    private rechargeService: RechargeService,
    private pokemonRecordService: PokemonRecordService
  ) {}

  ngOnInit(): void {
    this.rechargeRecords$ =
      this.rechargeService.getAllRechargeRecordsByUserId();
    this.pokemonRecords$ =
      this.pokemonRecordService.getAllPokemonRecordsByCurrentUserId();
    this.combined$ = combineLatest([
      (this.rechargeRecords$ =
        this.rechargeService.getAllRechargeRecordsByUserId()),
      (this.pokemonRecords$ =
        this.pokemonRecordService.getAllPokemonRecordsByCurrentUserId()),
    ]).pipe(
      map(([rechargeRecords, pokemonRecords]) => {
        const rechargeRecordMappe: HomeObject[] = rechargeRecords.map(
          (rechargeRecord) => ({
            homeObjectDate: rechargeRecord.rechargeAt!,
            homeObjectType: 'RECHARGE_RECORD',
            homeObject: rechargeRecord,
          })
        );
        const pokemonRecordMappe: HomeObject[] = pokemonRecords.map(
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
