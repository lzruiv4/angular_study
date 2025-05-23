import { RoleType } from './enums/RoleType.enum';

export interface UserLoginResponseTokenDTO {
  userId: string;
  token: string;
}

export interface UserRegisterRequestDTO {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  roles: RoleType[];
}

export interface UserRegisterResponseDTO {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
}
