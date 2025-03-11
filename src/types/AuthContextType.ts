import type { IUser } from "./User.type";

export type AuthContextType = {
  isAuthenticated: () => boolean;
  logout: () => Promise<void>;
  setData: (accessToken: string, user: IUser, refressToken: string) => Promise<void>;
  user: IUser;
};