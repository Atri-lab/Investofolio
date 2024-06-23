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
  volume?: number;
  beta?: number;
  peratio?: number;
  revenue?: number;
}

export interface HistoricalData {
  NVDA: { [K in keyof HistoricalData]: string[] };
  AAPL: { [K in keyof HistoricalData]: string[]};
  TSLA: { [K in keyof HistoricalData]: string[] };
  GS: { [K in keyof HistoricalData]: string[] };
}
