import { Component, OnInit } from '@angular/core';
import { RechargeService } from '../../service/recharge.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-recharge',
  imports: [NzModalModule, FormsModule, NzSelectModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.css',
})
export class RechargeComponent implements OnInit {
  isRechargeVisible = false;

  constructor(private rechargeService: RechargeService) {}

  ngOnInit(): void {
    this.rechargeService.showRechargeModal$.subscribe(() => {
      this.isRechargeVisible = true;
    });
  }

  handleOk(): void {
    // TODO: implement recharge function with service
    this.isRechargeVisible = false;
  }

  handleCancel(): void {
    this.isRechargeVisible = false;
  }
}
