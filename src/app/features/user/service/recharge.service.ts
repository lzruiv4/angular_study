import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RechargeService {
  private openRechargeHistory = new Subject<void>();
  showRechargeHistoryModal$ = this.openRechargeHistory.asObservable();

  private openRecharge = new Subject<void>();
  showRechargeModal$ = this.openRecharge.asObservable();

  triggerRechargeModal() {
    this.openRecharge.next();
  }

  triggerRechargeHistoryModal() {
    this.openRechargeHistory.next();
  }
}
