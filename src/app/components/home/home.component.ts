import { Component } from '@angular/core';
import { UserInfoComponent } from '../user/user-info/user-info.component';
import { TimelineComponent } from '@/shared/base-components/timeline/timeline.component';

@Component({
  selector: 'app-home',
  imports: [UserInfoComponent, TimelineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {}
