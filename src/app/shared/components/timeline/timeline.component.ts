import { IRecord } from '@/shared/models/ITimelineObject.model';
import { DATE_PIPE } from '@/shared/utils/DateTools';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timeline',
  imports: [CommonModule, NzTimelineModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {
  @Input() combined$!: Observable<IRecord[]>;
  @Input() isCustom?: boolean = false;
  date_pipe = DATE_PIPE;
}
