import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HEADER_LIST } from '../../core/constants/Header-Setting';
import { AuthService } from '@/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NzHeaderComponent, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuList = HEADER_LIST;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  trackByPath(index: number, item: any) {
    return item.path;
  }
}
