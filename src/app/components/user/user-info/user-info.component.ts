import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { POKEMON_AMOUNT } from '@/core/constants/API-Setting';
import { PokemonRecordService } from '@/services/pokemon-record.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from '@/services/user.service';
import { ImageComponent } from '@/shared/base-components/image/image.component';

@Component({
  selector: 'app-user-info',
  imports: [
    CommonModule,
    NzDescriptionsModule,
    NzGridModule,
    NzStatisticModule,
    ImageComponent,
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.less',
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  amount = POKEMON_AMOUNT;

  captured!: Observable<number>;

  constructor(
    private userService: UserService,
    private pokemonRecordService: PokemonRecordService,
  ) {}

  ngOnInit(): void {
    if (this.userService.user$) {
      this.userService.getUserInfo().pipe(takeUntil(this.destroy$)).subscribe();
    }
    this.captured = this.pokemonRecordService.getUniquePokemonCount();
  }

  get user$() {
    return this.userService.user$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
