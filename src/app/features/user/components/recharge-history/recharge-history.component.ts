import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { RechargeService } from '../../service/recharge.service';
import { CommonModule } from '@angular/common';
import { DATE_PIPE } from '@/shared/utils/DateTools';

@Component({
  selector: 'app-recharge-history',
  imports: [CommonModule, NzModalModule, NzTimelineModule],
  templateUrl: './recharge-history.component.html',
  styleUrl: './recharge-history.component.css',
})
export class RechargeHistoryComponent implements OnInit {
  isChargeHistoryVisible: boolean = false;
  date_pipe: string = DATE_PIPE;

  get rechargeRecords$() {
    return this.rechargeService.rechargeRecords$;
  }

  constructor(private rechargeService: RechargeService) {}

  ngOnInit(): void {
    this.rechargeService.showRechargeHistoryModal$.subscribe(() => {
      this.isChargeHistoryVisible = true;
    });
    this.rechargeService.getAllRechargeRecordsByUserId();
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
