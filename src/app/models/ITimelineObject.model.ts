import { IPokemonRecord } from './IPokemen.model';
import { IRechargeRecord } from './IRechargeRecord.model';
import { RecordType } from './enums/RecordType.enum';

export type IRecord =
  | {
      recordDate: Date;
      recordType?: RecordType.RECHARGE_RECORD;
      recordObject: IRechargeRecord;
    }
  | {
      recordDate: Date;
      recordType?: RecordType.POKEMON_RECORD;
      recordObject: IPokemonRecord;
    };
