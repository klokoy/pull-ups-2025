export interface PullUpData {
  date: string; // ISO format YYYY-MM-DD
  count: number;
}

export interface PullUpStats {
  total: number;
  average: number;
  remaining: number;
  daysLeft: number;
  requiredDaily: number;
  streak: number;
  bestDay: {
    date: string;
    count: number;
  };
}
