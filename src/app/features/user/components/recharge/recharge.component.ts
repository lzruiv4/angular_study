import { Component, OnInit } from '@angular/core';
import { RechargeService } from '../../service/recharge.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserService } from '../../service/user.service';
import { IUser } from '../../../../shared/models/IUser.model';

@Component({
  selector: 'app-recharge',
  imports: [NzModalModule, FormsModule, NzSelectModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.css',
})
export class RechargeComponent implements OnInit {
  isRechargeVisible = false;

  selectOption: number = 0;

  user: IUser = {
    id: '',
    firstname: '',
    lastname: '',
    poke_coin: 0,
  };

  constructor(
    private rechargeService: RechargeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.rechargeService.showRechargeModal$.subscribe(() => {
      this.isRechargeVisible = true;
    });
    this.userService.getUserInfo().subscribe((user) => {
      this.user = user;
    });
  }

  selectedOneOption(value: number): void {
    this.selectOption = value;
  }

  handleOk(): void {
    if (this.selectOption !== 0) {
      const newUser = {
        id: this.user.id,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        poke_coin: this.user.poke_coin + Number(this.selectOption),
      };
      this.userService.updateUser(newUser).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.user = newUser;
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert('An error occurred while updating the user.');
        },
      });
    }
    this.selectOption = 0;
    this.isRechargeVisible = false;
  }

  handleCancel(): void {
    this.selectOption = 0;
    this.isRechargeVisible = false;
  }
}
