import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RechargeService {

  private openRecharge = new Subject<void>();
  showRechargeModal$ = this.openRecharge.asObservable();

  triggerRechargeModal() {
    this.openRecharge.next();
  }

  private openRechargeHistory = new Subject<void>();
  showRechargeHistoryModal$ = this.openRechargeHistory.asObservable();

  triggerRechargeHistoryModal() {
    this.openRechargeHistory.next();
  }
}
