import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RechargeService } from '../../../services/recharge.service';
import { CommonModule } from '@angular/common';
import { IRechargeRecord } from '@/models/IRechargeRecord.model';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { IRecord } from '@/models/ITimelineObject.model';
import { TimelineComponent } from '../../../shared/base-components/timeline/timeline.component';
import { RecordType } from '@/models/enums/RecordType.enum';

@Component({
  selector: 'app-recharge-history',
  imports: [CommonModule, NzModalModule, TimelineComponent],
  templateUrl: './recharge-history.component.html',
  styleUrl: './recharge-history.component.less',
})
export class RechargeHistoryComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  isChargeHistoryVisible: boolean = false;

  rechargeRecords$!: Observable<IRecord[]>;

  constructor(private rechargeService: RechargeService) {}

  ngOnInit(): void {
    this.rechargeService.showRechargeHistoryModal$.subscribe(() => {
      this.isChargeHistoryVisible = true;
    });
    this.rechargeRecords$ = this.rechargeService.rechargeRecords$.pipe(
      takeUntil(this.destroy$),
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
