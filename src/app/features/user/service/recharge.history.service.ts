import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RechargeHistoryService {
  private openRechargeHistory = new Subject<void>();
  showModal$ = this.openRechargeHistory.asObservable();

  triggerModal() {
    this.openRechargeHistory.next();  // 通知订阅者打开弹窗
  }
}
