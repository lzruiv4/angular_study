import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RechargeService } from '../../../user/service/recharge.service';
import { RechargeHistoryComponent } from '../../../user/components/recharge-history/recharge-history.component';
import { RechargeComponent } from '../../../user/components/recharge/recharge.component';
import { PokemonRecordService } from '../../services/pokemon-record.service';
import { UserService } from '../../../user/service/user.service';
import { CatchNewPokemonComponent } from '../catch-new-pokemon/catch-new-pokemon.component';
import { IPokemonRecordInList } from '../../../../shared/models/IPokemen.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poke-lotto',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    RechargeHistoryComponent,
    RechargeComponent,
    CatchNewPokemonComponent,
  ],
  templateUrl: './poke-lotto.component.html',
  styleUrl: './poke-lotto.component.css',
})
export class PokeLottoComponent implements OnInit {
  constructor(
    private rechargeService: RechargeService,
    private pokemonRecordService: PokemonRecordService,
    private userService: UserService
  ) {}

  // Getter for user
  get user$() {
    return this.userService.user$;
  }

  pokemonRecordInList$!: Observable<IPokemonRecordInList[]>;

  ngOnInit(): void {
    this.pokemonRecordInList$ = this.pokemonRecordService.groupByRecords();
    this.userService.getUserInfo();
  }

  openRechargeHistory(): void {
    this.rechargeService.triggerRechargeHistoryModal();
  }

  openRecharge(): void {
    this.rechargeService.triggerRechargeModal();
  }

  openCatchPokemonDialog(): void {
    this.pokemonRecordService.triggerRechargeModal();
  }

  parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  sortByDate = (a: any, b: any): number => {
    const today = new Date();
    const diffA = Math.abs(this.parseDate(a.date).getTime() - today.getTime());
    const diffB = Math.abs(this.parseDate(b.date).getTime() - today.getTime());
    return diffA - diffB;
  };
}
