import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IPokemonRecord } from '../../../../shared/models/IPokemen.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RechargeHistoryService } from '../../../user/service/recharge.history.service';
import { RechargeHistoryComponent } from '../../../user/components/recharge-history/recharge-history.component';

@Component({
  selector: 'app-poke.lotto',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    RechargeHistoryComponent,
  ],
  templateUrl: './poke-lotto.component.html',
  styleUrl: './poke-lotto.component.css',
})
export class PokeLottoComponent {
  pokemonRecords: IPokemonRecord[] = [];

  constructor(private rechargeHistoryService: RechargeHistoryService) {}

  openRechargeHistory(): void {
    this.rechargeHistoryService.triggerModal();
  }
}
