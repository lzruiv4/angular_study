import { IPokemonRecord } from './IPokemen.model';
import { IRechargeRecord } from './IRechargeRecord.model';

export type IRecord =
  | {
      homeObjectDate: Date;
      homeObjectType: 'RECHARGE_RECORD';
      homeObject: IRechargeRecord;
    }
  | {
      homeObjectDate: Date;
      homeObjectType: 'POKEMON_RECORD';
      homeObject: IPokemonRecord;
    };
