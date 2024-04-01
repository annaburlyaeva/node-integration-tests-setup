import { orders } from "./orders"

interface SeedData {
  [key: string]: any
}

export const SEED_DATA: SeedData = {
  orders: orders
}
