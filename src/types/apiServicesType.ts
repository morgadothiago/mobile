import type { IImage } from "./Image.type";
import type { IUser } from "./User.type";



export type IErrorResponse = {
  message: string;
  status: number;
} | {
  message: {
    [key: string]: string[];
  };
  status: 422;
}

export interface ILoginResponse {
  user: IUser,
  accessToken: string,
  refreshToken: string
}
