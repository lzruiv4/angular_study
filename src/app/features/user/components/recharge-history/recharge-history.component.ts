import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { RechargeService } from '../../service/recharge.service';

@Component({
  selector: 'app-recharge-history',
  imports: [NzModalModule, NzTimelineModule],
  templateUrl: './recharge-history.component.html',
  styleUrl: './recharge-history.component.css',
})
export class RechargeHistoryComponent implements OnInit {
  isChargeHistoryVisible = false;

  constructor(private rechargeService: RechargeService) {}

  ngOnInit(): void {
    this.rechargeService.showRechargeHistoryModal$.subscribe(() => {
      this.isChargeHistoryVisible = true;
    });
  }

  handleOk(): void {
    // console.log('Button ok clicked!');
    this.isChargeHistoryVisible = false;
  }

  handleCancel(): void {
    // console.log('Button cancel clicked!');
    this.isChargeHistoryVisible = false;
  }
}
