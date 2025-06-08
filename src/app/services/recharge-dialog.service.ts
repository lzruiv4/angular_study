import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RechargeDialogService {
  /**
   * open a dialog for coin recharge
   */
  private rechargeDialogSubject = new Subject<void>();
  rechargeDialogObserver$ = this.rechargeDialogSubject.asObservable();

  triggerRechargeDialog() {
    this.rechargeDialogSubject.next();
  }

  /**
   * open a dialog for recharge history
   */
  private rechargeDialogHistorySubject = new Subject<void>();
  rechargeDialogHistory$ = this.rechargeDialogHistorySubject.asObservable();

  triggerRechargeHistoryDialog() {
    this.rechargeDialogHistorySubject.next();
  }
}
