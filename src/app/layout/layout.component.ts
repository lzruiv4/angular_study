import { Component, OnInit } from '@angular/core';

import { NzContentComponent } from 'ng-zorro-antd/layout';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [HeaderComponent, NzContentComponent, FooterComponent],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
