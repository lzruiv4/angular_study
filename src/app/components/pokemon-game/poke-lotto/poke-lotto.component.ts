import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RechargeService } from '../../../services/recharge.service';
import { RechargeHistoryComponent } from '../recharge-history/recharge-history.component';
import { RechargeComponent } from '../recharge/recharge.component';
import { PokemonRecordService } from '../../../services/pokemon-record.service';
import { CatchNewPokemonComponent } from '../catch-new-pokemon/catch-new-pokemon.component';
import { filter } from 'rxjs';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { UserService } from '@/services/user.service';
import { ImageComponent } from '@/shared/base-components/image/image.component';

@Component({
  selector: 'app-poke-lotto',
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    RechargeHistoryComponent,
    RechargeComponent,
    CatchNewPokemonComponent,
    NzAlertModule,
    ImageComponent,
  ],
  templateUrl: './poke-lotto.component.html',
  styleUrl: './poke-lotto.component.less',
})
export class PokeLottoComponent implements OnInit {
  constructor(
    private rechargeService: RechargeService,
    private pokemonRecordService: PokemonRecordService,
    private userService: UserService,
  ) {}

  isWarningVisible = false;

  // Getter for user
  get user$() {
    return this.userService.user$;
  }

  get pokemonRecordInList$() {
    return this.pokemonRecordService.pokemonRecordInList$;
  }

  ngOnInit(): void {
    if (this.userService.user$) {
      this.userService.getUserInfo().subscribe();
    }
    this.pokemonRecordService.getPokemonRecordsInTable();
  }

  openRechargeHistory(): void {
    this.rechargeService.triggerRechargeHistoryModal();
  }

  openRecharge(): void {
    this.rechargeService.triggerRechargeModal();
  }

  openCatchPokemonDialog(): void {
    this.user$.pipe(filter((user) => !!user)).subscribe((user) => {
      if (user.pokemonCoin > 0) {
        this.pokemonRecordService.triggerCapturePokemonModal();
      }
    });
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
