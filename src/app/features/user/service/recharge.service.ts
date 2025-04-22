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
import { currentUserId } from '../../../core/constants/User-API';

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
    return this.rechargeRecordsHttp
      .post<IRechargeRecordDTO>(
        RECHARGE_RECORD_API + '?user_id=' + currentUserId,
        newRechargeRecordDTO
      )
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
        RECHARGE_RECORD_API + '?user_id=' + currentUserId
      )
      .pipe(
        tap((records) => this.rechargeRecordsSubject.next(records)),
        catchError((error) => {
          console.error('', error);
          throw error;
        })
      )
      .subscribe();
  }
}
