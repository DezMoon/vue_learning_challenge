import { ref, watch, computed } from "vue";
import type { Habit, HabitCategory } from "./types";

const STORAGE_KEY = "habit-tracker-data";
const STREAK_KEY = "habit-streak-dates";

// Initialize data safely
const habits = ref<Habit[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
);
const completedDates = ref<string[]>(
  JSON.parse(localStorage.getItem(STREAK_KEY) || "[]"),
);

// Global Watchers
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
    if (habit) habit.name = newName;
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

  // --- STREAK LOGIC FIXED ---

  const recordDailyWin = (isAllDone: boolean) => {
    const today = new Date().toLocaleDateString("en-CA"); // Gets YYYY-MM-DD reliably
    const dateSet = new Set(completedDates.value);

    if (isAllDone) {
      dateSet.add(today);
    } else {
      dateSet.delete(today);
    }
    completedDates.value = Array.from(dateSet);
  };

  const streakCount = computed(() => {
    if (completedDates.value.length === 0) return 0;

    const dateSet = new Set(completedDates.value);
    let count = 0;
    let checkDate = new Date(); // Start with today

    // Check today. If today isn't done, check yesterday.
    let dateStr = checkDate.toLocaleDateString("en-CA");

    if (!dateSet.has(dateStr)) {
      // If today isn't done, move back to yesterday to see if streak is still alive
      checkDate.setDate(checkDate.getDate() - 1);
      dateStr = checkDate.toLocaleDateString("en-CA");
    }

    // Loop backwards as long as we find consecutive dates in our set
    while (dateSet.has(dateStr)) {
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
