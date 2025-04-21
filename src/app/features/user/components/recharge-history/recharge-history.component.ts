import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RechargeHistoryService } from '../../service/recharge.history.service';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@Component({
  selector: 'app-recharge-history',
  imports: [NzModalModule, NzTimelineModule],
  templateUrl: './recharge-history.component.html',
  styleUrl: './recharge-history.component.css',
})
export class RechargeHistoryComponent implements OnInit {
  isVisible = false;

  constructor(private rechargeHistoryService: RechargeHistoryService) {}

  ngOnInit(): void {
    this.rechargeHistoryService.showModal$.subscribe(() => {
      this.isVisible = true;
    });
  }

  handleOk(): void {
    // console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    // console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
