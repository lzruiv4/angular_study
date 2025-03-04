import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-header',
  imports: [NzHeaderComponent, NzDropDownModule, NzIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
