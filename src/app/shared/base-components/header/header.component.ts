import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@/services/auth.service';
import { HEADER_LIST } from '@/core/constants/Header-Setting';
import { LogoutOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule, provideNzIconsPatch } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-header',
  imports: [
    NzIconModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [provideNzIconsPatch([LogoutOutline])],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
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
