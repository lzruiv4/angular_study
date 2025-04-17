import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface menuInfo {
  name: string;
  lists?: menuInfo[]; // Melden hier Fehler, falls keinen List angegeben ist.
}

@Component({
  selector: 'app-header',
  imports: [NzDropDownModule, NzIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuList: menuInfo[] = [
    {
      name: 'Home',
    },
    {
      name: 'Car',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
