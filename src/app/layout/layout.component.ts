import { Component, OnInit } from '@angular/core';
import { NzFooterComponent, NzHeaderComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { LicensesComponent } from '../core/produkt/licenses/licenses.component';

// angular 核心模块导入组件
@Component({  // 装饰器定义组件元数据
  selector: 'app-layout', // Component name
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    HeaderComponent,
    NzHeaderComponent,
    FooterComponent,
    NzFooterComponent,
  ],
})
export class LayoutComponent implements OnInit {
  footer: string =
    'Ant Design ©' + new Date().getFullYear() + ' Implement By Lin';

  constructor() {}

  ngOnInit() {}
}
