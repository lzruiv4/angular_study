import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RechargeService } from '../../../shared/services/recharge.service';
import { CommonModule } from '@angular/common';
import { IRechargeRecord } from '@/shared/models/IRechargeRecord.model';
import { map, Observable } from 'rxjs';
import { IRecord } from '@/shared/models/ITimelineObject.model';
import { TimelineComponent } from '../../../shared/components/timeline/timeline.component';
import { RecordType } from '@/shared/models/RecordType.enum';

@Component({
  selector: 'app-recharge-history',
  imports: [CommonModule, NzModalModule, TimelineComponent],
  templateUrl: './recharge-history.component.html',
  styleUrl: './recharge-history.component.css',
})
export class RechargeHistoryComponent implements OnInit {
  isChargeHistoryVisible: boolean = false;

  rechargeRecords$!: Observable<IRecord[]>;

  constructor(private rechargeService: RechargeService) {}

  ngOnInit(): void {
    this.rechargeService.showRechargeHistoryModal$.subscribe(() => {
      this.isChargeHistoryVisible = true;
    });
    this.rechargeRecords$ = this.rechargeService.rechargeRecords$.pipe(
      map((rechargeRecords) => {
        const rechargeRecordMappe: IRecord[] = rechargeRecords.map(
          (rechargeRecord) => ({
            recordDate: rechargeRecord.rechargeAt!,
            recordType: RecordType.RECHARGE_RECORD,
            recordObject: rechargeRecord,
          }),
        );
        return rechargeRecordMappe.sort(
          (a, b) =>
            new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime(),
        );
      }),
    );
  }

  handleOk(): void {
    // console.log('Button ok clicked!');
    this.isChargeHistoryVisible = false;
  }

  handleCancel(): void {
    // console.log('Button cancel clicked!');
    this.isChargeHistoryVisible = false;
  }

  trackByFun(index: number, item: IRechargeRecord) {
    return item.rechargeAt;
  }
}
