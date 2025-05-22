import { RoleType } from './enums/RoleType.enum';

export interface UserLoginDTO {
  userId: string;
  token: string;
}
export interface UserRegisterDTO {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  roles: RoleType[];
}
