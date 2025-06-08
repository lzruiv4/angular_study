import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {
  IRechargeRecord,
  IRechargeRecordDTO,
} from '../models/IRechargeRecord.model';
import { RECHARGE_RECORD_API } from '@/core/constants/API-Setting';
import { AuthService } from '@/services/auth.service';

@Injectable({ providedIn: 'root' })
export class RechargeService {
  private rechargeRecordsSubject = new BehaviorSubject<IRechargeRecord[] | []>(
    [],
  );
  rechargeRecords$ = this.rechargeRecordsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(
    private rechargeRecordsHttp: HttpClient,
    private authService: AuthService,
  ) {}

  createNewRechargeRecord(
    newRechargeRecordDTO: IRechargeRecordDTO,
  ): Observable<IRechargeRecord> {
    this.loadingSubject.next(true);
    return this.rechargeRecordsHttp
      .post<IRechargeRecordDTO>(RECHARGE_RECORD_API, newRechargeRecordDTO)
      .pipe(
        tap((record) => {
          const old = this.rechargeRecordsSubject.getValue() ?? [];
          this.rechargeRecordsSubject.next(this.recordsSort([...old, record]));
        }),
        catchError((err) => {
          console.error('Error occurred during create : ', err);
          return throwError(() => err);
        }),
        finalize(() => this.loadingSubject.next(true)),
      );
  }

  getAllRechargeRecordsByUserId(): Observable<IRechargeRecord[]> {
    this.loadingSubject.next(true);
    return this.rechargeRecordsHttp
      .get<
        IRechargeRecordDTO[]
      >(RECHARGE_RECORD_API + '/' + this.authService.getUserId())
      .pipe(
        tap((records) => {
          this.rechargeRecordsSubject.next(this.recordsSort(records));
        }),
        catchError((error) => {
          console.error('Get all recharge record by user id wrong.', error);
          this.rechargeRecordsSubject.next([]);
          throw error;
        }),
        finalize(() => this.loadingSubject.next(true)),
      );
  }

  recordsSort(records: IRechargeRecord[]): IRechargeRecord[] {
    return records.sort(
      (a, b) =>
        new Date(b.rechargeAt!).getTime() - new Date(a.rechargeAt!).getTime(),
    );
  }
}
