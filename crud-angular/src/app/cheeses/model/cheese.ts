import { Brand } from "./brand";

export interface Cheese {
  _id: string;
  name: string;
  category: string;
  brands?: Brand[];
}
