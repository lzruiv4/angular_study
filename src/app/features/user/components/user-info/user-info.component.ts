import { Component } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'app-user-info',
  imports: [NzBadgeModule, NzDescriptionsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {}
