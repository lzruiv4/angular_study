import { RecordType } from '@/models/enums/RecordType.enum';
import { DATE_PIPE } from '@/shared/utils/DateTools';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { Subject, takeUntil } from 'rxjs';
import { ImageComponent } from '../image/image.component';
import { RecordService } from '@/services/record.service';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule, NzTimelineModule, ImageComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.less',
})
export class TimelineComponent implements OnInit, OnDestroy {
  @Input() type?: string = 'custom'; // parameter for choice table type. custom or left

  destroy$ = new Subject<void>();

  recordType = RecordType;
  date_pipe = DATE_PIPE;

  constructor(private recordService: RecordService) {}

  get records$() {
    return this.recordService.records$;
  }

  ngOnInit(): void {
    this.recordService
      .setupRecords(this.type!)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
