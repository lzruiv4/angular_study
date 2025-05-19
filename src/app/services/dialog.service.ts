import { Injectable, Type } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DialogComponent } from '../shared/base-components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modal: NzModalService) {}

  // open<T>(
  //   contentComponent: Type<any>,
  //   title: string,
  //   params: any = {},
  //   width: number = 600,
  // ): NzModalRef<T> {
  //   return this.modal.create<
  //     DialogComponent,
  //     {
  //       title: string;
  //       contentComponent: Type<any>;
  //       contentParams: params;
  //     },
  //     T
  //   >({
  //     nzContent: DialogComponent,
  //     nzComponentParams: {
  //       title,
  //       contentComponent,
  //       contentParams: params,
  //     },
  //     nzWidth: width,
  //     nzFooter: null,
  //   });
  // }
}
