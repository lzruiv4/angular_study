export interface IRechargeRecordDTO {
  id?: string;
  userId: string;
  amountRecharge: number;
  currentPokemonCoin: number;
  rechargeAt?: Date;
}

export interface IRechargeRecord {
  rechargeRecordId?: string;
  userId: string;
  amountRecharge: number;
  currentPokemonCoin: number;
  rechargeAt?: Date;
}

export function mapDtoToModel(dto: IRechargeRecordDTO): IRechargeRecord {
  return {
    rechargeRecordId: dto.id,
    userId: dto.userId,
    amountRecharge: dto.amountRecharge,
    currentPokemonCoin: dto.currentPokemonCoin,
    rechargeAt: dto.rechargeAt,
  };
}

export function mapModelToDto(model: IRechargeRecord): IRechargeRecordDTO {
  return {
    id: model.rechargeRecordId,
    userId: model.userId,
    amountRecharge: model.amountRecharge,
    currentPokemonCoin: model.currentPokemonCoin,
    rechargeAt: model.rechargeAt,
  };
}
