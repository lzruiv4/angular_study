import { Component, OnInit } from '@angular/core';
import { RechargeService } from '../../../services/recharge.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { filter, map, switchMap, take } from 'rxjs';
import { IRechargeRecordDTO } from '@/models/IRechargeRecord.model';
// import { CURRENT_USER_ID } from '@/core/constants/User-API';
import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';

@Component({
  selector: 'app-recharge',
  imports: [NzModalModule, FormsModule, NzSelectModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.less',
})
export class RechargeComponent implements OnInit {
  isRechargeVisible = false;

  selectOption: number = 0;

  // Getter for user
  get user$() {
    return this.userService.user$;
  }

  constructor(
    private rechargeService: RechargeService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.rechargeService.showRechargeModal$.subscribe(() => {
      this.isRechargeVisible = true;
    });
  }

  selectedOneOption(value: number): void {
    this.selectOption = value;
  }

  handleOk(): void {
    if (this.selectOption !== 0) {
      this.updateUserInfo();
      this.createNewRechargeRecord();
    }
    this.selectOption = 0;
    this.isRechargeVisible = false;
  }

  handleCancel(): void {
    this.selectOption = 0;
    this.isRechargeVisible = false;
  }

  updateUserInfo(): void {
    this.user$
      .pipe(
        take(1),
        filter((user) => !!user),
        switchMap((user) => {
          // console.log('vor: ', user);
          const newUser = {
            ...user,
            pokemonCoin: user.pokemonCoin + Number(this.selectOption),
          };
          // console.log('nach: ', newUser);
          return this.userService.updateUser(newUser);
        }),
      )
      .subscribe();
  }

  createNewRechargeRecord(): void {
    this.user$
      .pipe(
        take(1),
        filter((user) => !!user),
        switchMap((user) => {
          // console.log(user);
          const newRechargeRecordDTO: IRechargeRecordDTO = {
            userId: this.authService.getUserId()!,
            amountRecharge: Number(this.selectOption),
            currentPokemonCoin: user.pokemonCoin + Number(this.selectOption),
            rechargeAt: new Date(),
          };
          return this.rechargeService.createNewRechargeRecord(
            newRechargeRecordDTO,
          );
        }),
      )
      .subscribe();
  }
}
