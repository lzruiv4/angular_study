import { Component, OnInit } from '@angular/core';
import { NzFooterComponent } from 'ng-zorro-antd/layout';
import { FOOTER_MESSAGE } from '../../core/constants/Header-Setting';

@Component({
  selector: 'app-footer',
  imports: [NzFooterComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
})
export class FooterComponent implements OnInit {
  footer = FOOTER_MESSAGE;

  constructor() {}

  ngOnInit(): void {}
}
