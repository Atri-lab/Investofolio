export interface Stock {
    stock: string;
    price: number;
    change: number;
    percent: number;
    up: boolean;
    ebita?: number;          
    week52Low?: number;
    week52High?: number;
    marketCap?: number;
  }