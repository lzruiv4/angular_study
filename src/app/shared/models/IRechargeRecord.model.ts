export interface IRechargeRecordDTO {
  id?: string;
  user_id: string;
  amount_recharge: number;
  current_poke_coin: number;
  recharge_date: string;
}

export interface IRechargeRecord {
  id?: string;
  user_id: string;
  amount_recharge: number;
  current_poke_coin: number;
  recharge_date: string;
}

export function mapDtoToModel(dto: IRechargeRecordDTO): IRechargeRecord {
  return {
    id: dto.id,
    user_id: dto.user_id,
    amount_recharge: dto.amount_recharge,
    current_poke_coin: dto.current_poke_coin,
    recharge_date: dto.recharge_date,
  };
}

export function mapModelToDto(model: IRechargeRecord): IRechargeRecordDTO {
  return {
    id: model.id,
    user_id: model.user_id,
    amount_recharge: model.amount_recharge,
    current_poke_coin: model.current_poke_coin,
    recharge_date: model.recharge_date,
  };
}
