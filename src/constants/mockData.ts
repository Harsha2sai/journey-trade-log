import type { Trade } from "@/types";

export const MOCK_TODAY_TRADES: Trade[] = [
  { id: 1, symbol: "EUR/USD", pnl: 120, win: true, time: "14:23" },
  { id: 2, symbol: "GBP/JPY", pnl: -45, win: false, time: "12:15" },
  { id: 3, symbol: "USD/JPY", pnl: 170.50, win: true, time: "09:42" },
];

export const MOCK_DASHBOARD_STATS = {
  todayPnL: 245.50,
  todayTrades: 3,
  winRate: 66.7,
  weeklyGoal: 500,
};

export const MOCK_TOP_TRADERS = [
  { name: "Alex Chen", winRate: 78, trades: 342, avatar: "AC" },
  { name: "Sarah Miller", winRate: 74, trades: 289, avatar: "SM" },
  { name: "Mike Johnson", winRate: 71, trades: 256, avatar: "MJ" },
];

export const MOCK_DISCUSSIONS = [
  { title: "Best strategy for EUR/USD?", author: "John Doe", replies: 23 },
  { title: "Managing risk in volatile markets", author: "Jane Smith", replies: 18 },
  { title: "Technical analysis tips", author: "Bob Wilson", replies: 15 },
];
