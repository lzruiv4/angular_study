export interface IRechargeRecordDTO {
  rechargeRecordId?: string;
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
