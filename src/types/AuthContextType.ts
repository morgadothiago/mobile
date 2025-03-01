import type { IUser } from "./User.type";

export interface AuthContextType {
  isAuthenticated: () => boolean;
  logout: () => void;
  setData: (accessToken: string, user: IUser, refressToken: string) => Promise<void>;
  user: IUser;
}