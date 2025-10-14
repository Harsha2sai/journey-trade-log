export type TradeDirection = "long" | "short";
export type TradeResult = "win" | "loss" | "breakeven";

export interface Trade {
  id: number;
  symbol: string;
  pnl: number;
  win: boolean;
  time: string;
}

export interface TradeFormData {
  symbol: string;
  direction: TradeDirection;
  entry: string;
  exit: string;
  size: string;
  pnl: string;
  result: TradeResult;
  notes: string;
}

export interface AudioFile {
  blob: Blob;
  duration: number;
}
