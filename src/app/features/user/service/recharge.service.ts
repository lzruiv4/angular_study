import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import {
  IRechargeRecord,
  IRechargeRecordDTO,
  mapDtoToModel,
  mapModelToDto,
} from '../../../shared/models/IRechargeRecord.model';
import { RECHARGE_RECORD_API } from '../../../core/constants/Recharge-API';
import { CURRENT_USER_ID } from '../../../core/constants/User-API';

@Injectable({ providedIn: 'root' })
export class RechargeService {
  /**
   * open a dialog for coin recharge
   */
  private openRecharge = new Subject<void>();
  showRechargeModal$ = this.openRecharge.asObservable();

  triggerRechargeModal() {
    this.openRecharge.next();
  }

  /**
   * open a dialog for recharge history
   */
  private openRechargeHistory = new Subject<void>();
  showRechargeHistoryModal$ = this.openRechargeHistory.asObservable();

  triggerRechargeHistoryModal() {
    this.openRechargeHistory.next();
  }

  private rechargeRecordsSubject = new BehaviorSubject<IRechargeRecord[] | []>(
    []
  );
  rechargeRecords$ = this.rechargeRecordsSubject.asObservable();

  constructor(private rechargeRecordsHttp: HttpClient) {}

  createNewRechargeRecord(
    newRechargeRecordDTO: IRechargeRecordDTO
  ): Observable<IRechargeRecord> {
    return this.rechargeRecordsHttp
      .post<IRechargeRecord>(RECHARGE_RECORD_API, newRechargeRecordDTO)
      .pipe(
        // map((model) => mapDtoToModel(model)),
        tap((record) => {
          const old = this.rechargeRecordsSubject.getValue() ?? [];
          this.rechargeRecordsSubject.next([...old, record]);
        }),
        catchError((err) => {
          console.error('Error occurred during create : ', err);
          return throwError(() => err);
        })
      );
  }

  getAllRechargeRecordsByUserId(): Observable<IRechargeRecord[]> {
    return this.rechargeRecordsHttp
      .get<IRechargeRecord[]>(
        RECHARGE_RECORD_API + '?userId=' + CURRENT_USER_ID
      )
      .pipe(
        tap((records) => {
          this.rechargeRecordsSubject.next(records);
        }),
        catchError((error) => {
          console.error('Get all recharge record by user id wrong.', error);
          this.rechargeRecordsSubject.next([]);
          throw error;
        })
      );
  }
}
