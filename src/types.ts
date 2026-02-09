export type HabitCategory = "Health" | "Study" | "Workout" | "Other";

export type HabitStatus = "pending" | "completed";

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  status: HabitStatus;
}
