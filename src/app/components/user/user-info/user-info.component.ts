import { Component, OnInit } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { POKEMON_AMOUNT } from '@/core/constants/Pokomon-API';
import { PokemonRecordService } from '@/shared/services/pokemon-record.service';
import { Observable } from 'rxjs';
import { UserService } from '@/shared/services/user.service';
import { ImageComponent } from '@/shared/components/image/image.component';

@Component({
  selector: 'app-user-info',
  imports: [
    CommonModule,
    NzBadgeModule,
    NzDescriptionsModule,
    NzGridModule,
    NzStatisticModule,
    ImageComponent,
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent implements OnInit {
  amount = POKEMON_AMOUNT;

  captured!: Observable<number>;

  constructor(
    private userService: UserService,
    private pokemonRecordService: PokemonRecordService,
  ) {}

  ngOnInit(): void {
    this.captured = this.pokemonRecordService.getUniquePokemonCount();
  }

  get user$() {
    return this.userService.user$;
  }
}
