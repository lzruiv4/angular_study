import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IPokemonRecordInList } from '../../../../shared/models/IPokemen.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RechargeService } from '../../../user/service/recharge.service';
import { RechargeHistoryComponent } from '../../../user/components/recharge-history/recharge-history.component';
import { RechargeComponent } from '../../../user/components/recharge/recharge.component';
import { PokemonRecordService } from '../../services/pokemon-record.service';
import { UserService } from '../../../user/service/user.service';
import { IUser } from '../../../../shared/models/IUser.model';
import { CatchNewPokemonComponent } from '../catch-new-pokemon/catch-new-pokemon.component';
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
  // pokemonRecords: IPokemonRecord[] = [];

  // pokemonRecords: IPokemonRecordInList[] = [];

  user: IUser | null = null;

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
    // this.pokemonRecordService
    //   .getAllPokemonRecordsByCurrentUserId()
    //   .subscribe((data) => (this.pokemonRecords = data));
    this.pokemonRecordInList$ = this.pokemonRecordService.groupByRecords();

    this.userService
      .getUserInfo()
      .subscribe((user: IUser | null) => (this.user = user));
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
}
