import { Component } from '@angular/core';
import { UserInfoComponent } from '../../features/user/components/user-info/user-info.component';

@Component({
  selector: 'app-home',
  imports: [UserInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
