import { ICategory } from "./Category";

export interface IProduct {
  _id?: string; // Trường _id là tùy chọn
  categoryId?: string; // Trường categoryId là tùy chọn
  name: string; // Trường name là bắt buộc
  price: number; // Trường price là bắt buộc
  image: string; // Trường image là bắt buộc
  description: string; // Trường description là bắt buộc
  category?: ICategory; // Trường category là tùy chọn
}