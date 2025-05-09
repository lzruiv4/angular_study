import { IRecord } from '@/shared/models/ITimelineObject.model';
import { RecordType } from '@/shared/models/RecordType.enum';
import { DATE_PIPE } from '@/shared/utils/DateTools';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { Observable } from 'rxjs';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule, NzTimelineModule, ImageComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {
  @Input() combined$!: Observable<IRecord[]>;
  @Input() isCustom?: boolean = false; // parameter for choice table type. custom or left
  recordType = RecordType;
  date_pipe = DATE_PIPE;
}
