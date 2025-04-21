import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IPokemonRecord } from '../../../../shared/models/IPokemen.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RechargeService } from '../../../user/service/recharge.service';
import { RechargeHistoryComponent } from '../../../user/components/recharge-history/recharge-history.component';
import { RechargeComponent } from '../../../user/components/recharge/recharge.component';

@Component({
  selector: 'app-poke.lotto',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    RechargeHistoryComponent,
    RechargeComponent,
  ],
  templateUrl: './poke-lotto.component.html',
  styleUrl: './poke-lotto.component.css',
})
export class PokeLottoComponent {
  pokemonRecords: IPokemonRecord[] = [];

  constructor(private rechargeService: RechargeService) {}

  openRechargeHistory(): void {
    console.log('rr');
    this.rechargeService.triggerRechargeHistoryModal();
  }

  openRecharge(): void {
    console.log('rr1111');
    this.rechargeService.triggerRechargeModal();
  }
}
