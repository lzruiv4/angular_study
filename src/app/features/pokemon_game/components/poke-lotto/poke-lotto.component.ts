import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IPokemonRecord } from '../../../../shared/models/IPokemen.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RechargeService } from '../../../user/service/recharge.service';
import { RechargeHistoryComponent } from '../../../user/components/recharge-history/recharge-history.component';
import { RechargeComponent } from '../../../user/components/recharge/recharge.component';
import { PokemonRecordService } from '../../services/pokemon-record.service';

@Component({
  selector: 'app-poke-lotto',
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
export class PokeLottoComponent implements OnInit {
  pokemonRecords: IPokemonRecord[] = [];

  constructor(
    private rechargeService: RechargeService,
    private pokemonRecordService: PokemonRecordService
  ) {}

  ngOnInit(): void {
    this.pokemonRecordService.getAllPokemonRecordsByCurrentUserId().subscribe();
    this.pokemonRecordService.pokemonRecords$.subscribe(
      (data) => (this.pokemonRecords = data)
    );
    console.log(this.pokemonRecords);
  }

  openRechargeHistory(): void {
    this.rechargeService.triggerRechargeHistoryModal();
  }

  openRecharge(): void {
    this.rechargeService.triggerRechargeModal();
  }
}
