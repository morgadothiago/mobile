import type { IImage } from "./Image.type";

export interface IUser {
  avatar: string;
  name: string,
  id: string,
  nickname: string,
  email: string,
  password: string,
  requiresPassChange: true,
  suspended: true,
  imageId: string,
  Image: IImage
}
