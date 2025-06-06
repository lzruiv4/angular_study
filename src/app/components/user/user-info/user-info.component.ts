import { Component, Input } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { POKEMON_AMOUNT } from '@/core/constants/API-Setting';
import { Observable } from 'rxjs';
import { ImageComponent } from '@/shared/base-components/image/image.component';
import { IUser } from '@/models/IUser.model';

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
  @Input() user$!: Observable<IUser | null>;
  @Input() captured!: Observable<number>;

  amount = POKEMON_AMOUNT;
}
