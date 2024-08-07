import { Cheese } from "./cheese";

export interface CheesePage {
  cheeses: Cheese[];
  totalElements: number;
  totalPages: number;
}
