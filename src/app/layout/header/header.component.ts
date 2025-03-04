import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';

interface menuInfo {
  name: string;
  list?: menuInfo[]; // Melden hier Fehler, falls keinen List angegeben ist.
}

@Component({
  selector: 'app-header',
  imports: [NzDropDownModule, NzIconModule, NzHeaderComponent, NgFor],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuList: menuInfo[] = [
    {
      name: 'Home',
    },
    {
      name: 'Test1',
      list: [
        {
          name: 'Test1-1',
        },
        {
          name: 'Test1-2',
        },
        {
          name: 'Test1-3',
        },
      ],
    },
  ];
  constructor() {}

  ngOnInit() {}
}
