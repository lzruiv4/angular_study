import { Component, OnInit } from '@angular/core';
import { NzFooterComponent, NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { LicensesComponent } from '../core/produkt/licenses/licenses.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    HeaderComponent,
    NzHeaderComponent,
    FooterComponent,
    NzFooterComponent,
    // LicensesComponent,
  ],
})
export class LayoutComponent implements OnInit {
  footer: string =
    'Ant Design ©' + new Date().getFullYear() + ' Implement By Lin';

  constructor() {}

  ngOnInit() {}
}
