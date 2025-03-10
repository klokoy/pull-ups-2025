import { differenceInDays, format, parseISO } from "date-fns";
import { PullUpData, PullUpStats } from "../types";

export const GOAL = 5000;

export const initialData: PullUpData[] = [
  // Data from CSV (reformatted from DD/MM/YYYY to YYYY-MM-DD)
  { date: "2025-01-01", count: 15 },
  { date: "2025-01-02", count: 15 },
  { date: "2025-01-03", count: 15 },
  { date: "2025-01-04", count: 15 },
  { date: "2025-01-05", count: 16 },
  { date: "2025-01-06", count: 18 },
  { date: "2025-01-07", count: 20 },
  { date: "2025-01-08", count: 18 },
  { date: "2025-01-09", count: 20 },
  { date: "2025-01-10", count: 22 },
  { date: "2025-01-11", count: 17 },
  { date: "2025-01-12", count: 22 },
  { date: "2025-01-13", count: 18 },
  { date: "2025-01-14", count: 16 },
  { date: "2025-01-15", count: 32 },
  { date: "2025-01-16", count: 22 },
  { date: "2025-01-17", count: 16 },
  { date: "2025-01-18", count: 25 },
  { date: "2025-01-19", count: 15 },
  { date: "2025-01-20", count: 18 },
  { date: "2025-01-21", count: 14 },
  { date: "2025-01-22", count: 20 },
  { date: "2025-01-23", count: 21 },
  { date: "2025-01-24", count: 25 },
  { date: "2025-01-25", count: 20 },
  { date: "2025-01-26", count: 14 },
  { date: "2025-01-27", count: 25 },
  { date: "2025-01-28", count: 20 },
  { date: "2025-01-29", count: 18 },
  { date: "2025-01-30", count: 18 },
  { date: "2025-01-31", count: 17 },
  { date: "2025-02-01", count: 17 },
  { date: "2025-02-02", count: 15 },
  { date: "2025-02-03", count: 17 },
  { date: "2025-02-04", count: 15 },
  { date: "2025-02-05", count: 20 },
  { date: "2025-02-06", count: 20 },
  // February 7th has no count, so skipping
  { date: "2025-02-08", count: 30 },
  { date: "2025-02-09", count: 20 },
  { date: "2025-02-10", count: 15 },
  { date: "2025-02-11", count: 15 },
  { date: "2025-02-12", count: 22 },
  { date: "2025-02-13", count: 20 },
  { date: "2025-02-14", count: 30 },
  { date: "2025-02-15", count: 30 },
  { date: "2025-02-16", count: 15 },
  { date: "2025-02-17", count: 32 },
  // February 18th has no count, so skipping
  { date: "2025-02-19", count: 18 },
  // February 20-23rd have no counts, so skipping
  { date: "2025-02-24", count: 15 },
  { date: "2025-02-25", count: 30 },
  { date: "2025-02-26", count: 17 },
  { date: "2025-02-27", count: 30 },
  { date: "2025-02-28", count: 18 },
  // March 1st has no count, so skipping
  { date: "2025-03-02", count: 15 },
  // March 3rd has no count, so skipping
  { date: "2025-03-04", count: 18 },
  { date: "2025-03-05", count: 34 },
  { date: "2025-03-06", count: 22 },
  { date: "2025-03-08", count: 34 },
  { date: "2025-03-09", count: 15 },
  // All remaining dates don't have counts yet, so not included
];

export const getTodayFormatted = (): string => {
  return format(new Date(), "yyyy-MM-dd");
};

export const savePullUpData = (data: PullUpData[]): void => {
  localStorage.setItem("pullUpData", JSON.stringify(data));
};

export const loadPullUpData = (): PullUpData[] => {
  const storedData = localStorage.getItem("pullUpData");
  return storedData ? JSON.parse(storedData) : initialData;
};

export const addPullUps = (data: PullUpData[], count: number): PullUpData[] => {
  const today = getTodayFormatted();
  const updatedData = [...data];

  const todayIndex = updatedData.findIndex((item) => item.date === today);

  if (todayIndex >= 0) {
    updatedData[todayIndex] = {
      ...updatedData[todayIndex],
      count: updatedData[todayIndex].count + count,
    };
  } else {
    updatedData.push({ date: today, count });
  }

  return updatedData;
};

export const calculateStats = (data: PullUpData[]): PullUpStats => {
  const sortedData = [...data].sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );

  const total = sortedData.reduce((sum, day) => sum + day.count, 0);

  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const daysLeft = differenceInDays(endOfYear, today);

  const remaining = GOAL - total;
  const requiredDaily = daysLeft > 0 ? Math.ceil(remaining / daysLeft) : 0;

  const bestDay = sortedData.reduce(
    (best, current) => (current.count > best.count ? current : best),
    { date: "", count: 0 }
  );

  // Calculate streak
  let streak = 0;
  let currentStreak = 0;
  let previousDate: Date | null = null;

  sortedData.forEach((item) => {
    const currentDate = parseISO(item.date);

    if (
      previousDate === null ||
      differenceInDays(currentDate, previousDate) === 1
    ) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    previousDate = currentDate;
    streak = Math.max(streak, currentStreak);
  });

  const days = sortedData.length;
  const average = days > 0 ? Math.round(total / days) : 0;

  return {
    total,
    average,
    remaining,
    daysLeft,
    requiredDaily,
    streak,
    bestDay,
  };
};
