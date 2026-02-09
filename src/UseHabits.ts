// src/useHabits.ts
import { ref, computed, watch } from "vue";
import type { Habit, HabitCategory } from "./types";

const STORAGE_KEY = "habit-tracker-data";
const STREAK_KEY = "habit-streak-dates";

// --- State ---
const habits = ref<Habit[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
);
const completedDates = ref<string[]>(
  JSON.parse(localStorage.getItem(STREAK_KEY) || "[]"),
);

//so  it can watch what is actually inside the array not just thge barrayu itself, without this it only watches if you add or delete a habit and not editing
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

// creating composable functions to manage habits and streaks so i can use these functions all over the project when needed so i dont have to rewrite themn
export function useHabits() {
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
    //converting the date to a string(canadian format) so it is easy to sort
    const today = new Date().toLocaleDateString("en-CA");
    //to make sure we dont have duplicates and to make it easy to add or remove dates
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

    // If today isn’t done, start from yesterday
    let dateStr = checkDate.toLocaleDateString("en-CA");
    if (!dates.has(dateStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
      dateStr = checkDate.toLocaleDateString("en-CA");
    }

    // Count backwards until streak breaks
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
  };
}
