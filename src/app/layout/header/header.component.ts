import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface MenuInfo {
  name: string;
  lists?: MenuInfo[]; // Melden hier Fehler, falls keinen List angegeben ist.
}

@Component({
  selector: 'app-header',
  imports: [NzDropDownModule, NzIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuList: MenuInfo[] = [
    {
      name: "Home"
    },
    {
      name: "Test1",
      lists: [
        {
          name: "Test1-1"
        },
        {
          name: "Test1-2"
        },
        {
          name: "Test1-3"
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
