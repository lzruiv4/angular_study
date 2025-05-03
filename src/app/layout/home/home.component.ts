import { Component } from '@angular/core';
import { UserInfoComponent } from '../../features/user/components/user-info/user-info.component';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NzTableModule, NzButtonModule, UserInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
