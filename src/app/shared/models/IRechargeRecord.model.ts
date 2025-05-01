export interface IRechargeRecordDTO {
  rechargeRecordId?: string;
  userId: string;
  amountRecharge: number;
  currentPokemonCoin?: number;
  rechargeAt?: Date;
}

export interface IRechargeRecord {
  rechargeRecordId?: string;
  userId: string;
  amountRecharge: number;
  currentPokemonCoin?: number;
  rechargeAt?: Date;
}

export function mapDtoToModel(dto: IRechargeRecordDTO): IRechargeRecord {
  return {
    rechargeRecordId: dto.rechargeRecordId,
    userId: dto.userId,
    amountRecharge: dto.amountRecharge,
    currentPokemonCoin: dto.currentPokemonCoin,
    rechargeAt: dto.rechargeAt,
  };
}

export function mapModelToDto(model: IRechargeRecord): IRechargeRecordDTO {
  return {
    rechargeRecordId: model.rechargeRecordId,
    userId: model.userId,
    amountRecharge: model.amountRecharge,
    currentPokemonCoin: model.currentPokemonCoin,
    rechargeAt: model.rechargeAt,
  };
}
