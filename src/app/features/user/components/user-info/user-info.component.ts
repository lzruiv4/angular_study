import { Component, OnInit } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { POKEMON_AMOUNT } from '@/core/constants/Pokomon-API';
import { PokemonRecordService } from '@/features/pokemon_game/services/pokemon-record.service';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  imports: [
    CommonModule,
    NzBadgeModule,
    NzDescriptionsModule,
    NzGridModule,
    NzIconModule,
    NzStatisticModule,
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent implements OnInit {
  amount = POKEMON_AMOUNT;

  captured!: Observable<number>;

  constructor(
    private userService: UserService,
    private pokemonRecordService: PokemonRecordService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe();
    this.captured = this.pokemonRecordService.getUniquePokemonCount();
  }

  get user$() {
    return this.userService.user$;
  }
}
