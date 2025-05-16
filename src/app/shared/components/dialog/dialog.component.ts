import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dialog',
  imports: [NzModalModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() contentComponent!: Type<any>;
  @Input() contentParams: any = {};

  @ViewChild('modalHost', { read: ViewContainerRef })
  modalHost!: ViewContainerRef;

  isVisible = true;

  innerComponentRef: ComponentRef<any> | null = null;

  constructor(private modalRef: NzModalRef) {}

  ngAfterViewInit(): void {
    const componentRef = this.modalHost.createComponent(this.contentComponent);
    Object.assign(componentRef.instance, this.contentParams);
    this.innerComponentRef = componentRef;
  }

  handleOk() {
    const result = this.innerComponentRef?.instance?.getResult?.();
    this.modalRef.close(result ?? true);
  }

  handleCancel() {
    this.modalRef.close(null);
  }
}
