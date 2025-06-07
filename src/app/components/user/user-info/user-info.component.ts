import { Component } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { POKEMON_AMOUNT } from '@/core/constants/API-Setting';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ImageComponent } from '@/shared/base-components/image/image.component';
import { PokemonRecordService } from '@/services/pokemon-record.service';
import { UserService } from '@/services/user.service';

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
export class UserInfoComponent {
  destroy$ = new Subject<void>();

  captured$!: Observable<number>;

  amount = POKEMON_AMOUNT;

  constructor(
    private pokemonRecordService: PokemonRecordService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().pipe(takeUntil(this.destroy$)).subscribe();
    this.captured$ = this.pokemonRecordService
      .getUniquePokemonCount()
      .pipe(takeUntil(this.destroy$));
  }

  get user$() {
    return this.userService.user$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
