import { IPokemonRecord } from './IPokemen.model';
import { IRechargeRecord } from './IRechargeRecord.model';

export type IRecord =
  | {
      recordDate: Date;
      recordType: 'RECHARGE_RECORD';
      recordObject: IRechargeRecord;
    }
  | {
      recordDate: Date;
      recordType: 'POKEMON_RECORD';
      recordObject: IPokemonRecord;
    };
