// src/useHabits.ts
import { ref, computed, watch } from "vue";
import type { Habit, HabitCategory } from "./types";

const STORAGE_KEY = "habit-tracker-data";
const STREAK_KEY = "habit-streak-dates";
const LAST_RESET_KEY = "habit-last-reset";

// --- State ---
const habits = ref<Habit[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
);
const completedDates = ref<string[]>(
  JSON.parse(localStorage.getItem(STREAK_KEY) || "[]"),
);

// so  it can watch what is actually inside the array not just the array itself, without this it only watches if you add or delete a habit and not editing
watch(
  habits,
  (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true },
);

watch(
  completedDates,
  (newVal) => {
    localStorage.setItem(STREAK_KEY, JSON.stringify(newVal));
  },
  { deep: true },
);

//creating composable functions to manage habits and streaks so i can use these functions all over the project when needed so i dont have to rewrite themn

// fdunction to reset a new day(how it works:-
function resetHabitsIfNewDay() {
  const today = new Date().toLocaleDateString("en-CA");
  const lastReset = localStorage.getItem(LAST_RESET_KEY);

  if (lastReset !== today) {
    habits.value = habits.value.map((h) => ({ ...h, status: "pending" }));
    localStorage.setItem(LAST_RESET_KEY, today);
  }
}

if (typeof resetHabitsIfNewDay === "function") {
  resetHabitsIfNewDay();
}
export function useHabits() {
  // Run reset check immediately when composable is used
  resetHabitsIfNewDay();

  const addHabit = (name: string, category: HabitCategory) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      category,
      status: "pending",
    };
    habits.value.push(newHabit);
  };

  const updateHabitName = (id: string, newName: string) => {
    const habit = habits.value.find((h) => h.id === id);
    if (habit) {
      habit.name = newName;
    }
  };

  const toggleStatus = (id: string) => {
    const habit = habits.value.find((h) => h.id === id);
    if (habit) {
      habit.status = habit.status === "pending" ? "completed" : "pending";
    }
  };

  const deleteHabit = (id: string) => {
    habits.value = habits.value.filter((h) => h.id !== id);
  };

  const recordDailyWin = (isAllDone: boolean) => {
    const today = new Date().toLocaleDateString("en-CA");
    const dates = new Set(completedDates.value);

    if (isAllDone) {
      dates.add(today);
    } else {
      dates.delete(today);
    }
    completedDates.value = Array.from(dates);
  };

  const streakCount = computed(() => {
    if (completedDates.value.length === 0) return 0;

    const dates = new Set(completedDates.value);
    let count = 0;
    let checkDate = new Date();

    let dateStr = checkDate.toLocaleDateString("en-CA");
    if (!dates.has(dateStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
      dateStr = checkDate.toLocaleDateString("en-CA");
    }

    while (dates.has(dateStr)) {
      count++;
      checkDate.setDate(checkDate.getDate() - 1);
      dateStr = checkDate.toLocaleDateString("en-CA");
    }

    return count;
  });

  return {
    habits,
    streakCount,
    addHabit,
    updateHabitName,
    toggleStatus,
    deleteHabit,
    recordDailyWin,
    resetHabitsIfNewDay,
  };
}
