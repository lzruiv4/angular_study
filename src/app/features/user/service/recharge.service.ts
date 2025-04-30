import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  switchMap,
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

  private rechargeRecordsSubject = new BehaviorSubject<
    IRechargeRecord[] | null
  >([]);
  rechargeRecords$: Observable<IRechargeRecord[] | null> =
    this.rechargeRecordsSubject.asObservable();

  constructor(private rechargeRecordsHttp: HttpClient) {}

  createNewRechargeRecord(
    newRechargeRecord: IRechargeRecord
  ): Observable<IRechargeRecord> {
    const newRechargeRecordDTO: IRechargeRecordDTO =
      mapModelToDto(newRechargeRecord);
    console.log('dto: ', newRechargeRecord);
    return this.rechargeRecordsHttp
      .post<IRechargeRecordDTO>(RECHARGE_RECORD_API, newRechargeRecordDTO)
      .pipe(
        map((model) => mapDtoToModel(model)),
        tap((record) => {
          console.log('Response from backend : ', record);
          const old = this.rechargeRecordsSubject.getValue() ?? [];
          this.rechargeRecordsSubject.next([...old, record]);
        }),
        catchError((err) => {
          console.error('Error occurred during create : ', err);
          return throwError(() => err);
        })
      );
  }

  getAllRechargeRecordsByUserId() {
    this.rechargeRecordsHttp
      .get<IRechargeRecordDTO[]>(
        RECHARGE_RECORD_API + '?userId=' + CURRENT_USER_ID
      )
      .pipe(
        tap((records) => {
          console.log('sdfsa', records);
          this.rechargeRecordsSubject.next(records);
        }),
        catchError((error) => {
          console.error('', error);
          throw error;
        })
      )
      .subscribe();
  }
}
