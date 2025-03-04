import { Component, OnInit } from '@angular/core';
import { NzFooterComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-footer',
  imports: [NzFooterComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
