//this file cenralizes all the logic related to habits
import { ref, computed, watch } from "vue";
import type { Habit, HabitCategory } from "./types";

const STORAGE_KEY = "habit-tracker-data"; // storage key that keeps all the habits
const STREAK_KEY = "habit-streak-dates"; // used to calculate the streaks
const LAST_RESET_KEY = "habit-last-reset"; // makes sure that habits only rest once per day

const habits = ref<Habit[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
);
const completedDates = ref<string[]>(
  JSON.parse(localStorage.getItem(STREAK_KEY) || "[]"),
);

// watchers are used so each tiume habits or the dates they were completed changes they should automatically get stored in the local storage
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

/*  Below are the list of all composable functions */

export function useHabits() {
  // Run reset check immediately when composable is used
  resetHabitsIfNewDay();

  // function to reset a new day(how it works:each time the app loads it checks if today's date is different from the last reset date if yes
  // then it resets all the habit's status to pending
  function resetHabitsIfNewDay() {
    const today = new Date().toLocaleDateString("en-CA");
    const lastReset = localStorage.getItem(LAST_RESET_KEY);

    if (lastReset !== today) {
      habits.value = habits.value.map((h) => ({ ...h, status: "pending" }));
      localStorage.setItem(LAST_RESET_KEY, today);
    }
  }
  // adds a habit to the list of habits with a unique id and a default status of pending
  const addHabit = (name: string, category: HabitCategory) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      category,
      status: "pending",
    };
    habits.value.push(newHabit);
  };

  //updates habit's name by id
  const updateHabitName = (id: string, newName: string) => {
    const habit = habits.value.find((h) => h.id === id);
    if (habit) {
      habit.name = newName;
    }
  };

  // changes habit's status by id
  const toggleStatus = (id: string) => {
    const habit = habits.value.find((h) => h.id === id);
    if (habit) {
      habit.status = habit.status === "pending" ? "completed" : "pending";
    }
  };

  //deletes habit by id
  const deleteHabit = (id: string) => {
    habits.value = habits.value.filter((h) => h.id !== id);
  };

  //adds today’s date to streaks if all habits are completed.
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

  //alculates how many consecutive days you’ve completed all habits.
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
