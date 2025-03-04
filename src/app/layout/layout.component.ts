import { Component, OnInit } from '@angular/core';
import { NzContentComponent, NzFooterComponent, NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [HeaderComponent, NzHeaderComponent, NzContentComponent, FooterComponent, NzFooterComponent]
})
export class LayoutComponent implements OnInit {
  footer : string = "Ant Design ©" + new Date().getFullYear() + " Implement By Lin"

  constructor() {}

  ngOnInit() {}
}
