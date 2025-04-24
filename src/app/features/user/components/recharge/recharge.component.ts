import { Component, OnInit } from '@angular/core';
import { RechargeService } from '../../service/recharge.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserService } from '../../service/user.service';
import Dayjs from 'dayjs';
import { filter, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-recharge',
  imports: [NzModalModule, FormsModule, NzSelectModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.css',
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
    private userService: UserService
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
          const newUser = {
            ...user,
            poke_coin: user.poke_coin + Number(this.selectOption),
          };
          return this.userService.updateUser(newUser);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Update successful:', response);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert('An error occurred while updating the user.');
        },
      });
  }

  createNewRechargeRecord(): void {
    this.user$
      .pipe(
        take(1),
        filter((user) => !!user),
        switchMap((user) => {
          const newRechargeRecord = {
            user_id: user.id,
            amount_recharge: Number(this.selectOption),
            current_poke_coin: user.poke_coin,
            recharge_date: Dayjs().format('DD-MM-YYYY HH:mm:ss'),
          };
          return this.rechargeService.createNewRechargeRecord(
            newRechargeRecord
          );
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Create successful:', response);
        },
        error: (error) => {
          console.error('Error creating :', error);
          alert('An error occurred while creating a new record.');
        },
      });
  }
}
