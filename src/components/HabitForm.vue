<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6"
  >
    <div
      class="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-6 sm:p-10 relative"
    >
      <button
        @click="closeModal"
        class="absolute top-6 right-8 text-slate-300 hover:text-slate-600 transition-colors text-xl font-bold"
      >
        ✕
      </button>

      <div class="text-center mb-10">
        <h3 class="text-2xl font-bold text-slate-800 mb-2">New Habit</h3>
        <p class="text-slate-500 text-sm">
          Pick a new habit to follow every day.
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <button
          @click="selectedCategory = 'Health'"
          :class="[
            'group flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl transition-all hover:scale-105 active:scale-95 border-2',
            selectedCategory === 'Health'
              ? 'border-sky-500 bg-sky-100'
              : 'bg-sky-50/50 border-sky-100',
          ]"
        >
          <div
            class="w-10 h-10 bg-sky-500 rounded-full mb-3 flex items-center justify-center text-white shadow-md"
          >
            <span class="text-lg">🍎</span>
          </div>
          <span class="font-bold text-sm text-sky-900">Health</span>
        </button>

        <button
          @click="selectedCategory = 'Study'"
          :class="[
            'group flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl transition-all hover:scale-105 active:scale-95 border-2',
            selectedCategory === 'Study'
              ? 'border-blue-500 bg-blue-100'
              : 'bg-blue-50/50 border-blue-100',
          ]"
        >
          <div
            class="w-10 h-10 bg-blue-500 rounded-full mb-3 flex items-center justify-center text-white shadow-md"
          >
            <span class="text-lg">📚</span>
          </div>
          <span class="font-bold text-sm text-blue-900">Study</span>
        </button>

        <button
          @click="selectedCategory = 'Workout'"
          :class="[
            'group flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl transition-all hover:scale-105 active:scale-95 border-2',
            selectedCategory === 'Workout'
              ? 'border-indigo-500 bg-indigo-100'
              : 'bg-indigo-50/50 border-indigo-400',
          ]"
        >
          <div
            class="w-10 h-10 bg-indigo-500 rounded-full mb-3 flex items-center justify-center text-white shadow-md"
          >
            <span class="text-lg">🤸</span>
          </div>
          <span class="font-bold text-sm text-indigo-900">Workout</span>
        </button>

        <button
          @click="selectedCategory = 'Other'"
          :class="[
            'group flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl transition-all hover:scale-105 active:scale-95 border-2',
            selectedCategory === 'Other'
              ? 'border-slate-700 bg-slate-200'
              : 'bg-slate-50 border-slate-100',
          ]"
        >
          <div
            class="w-10 h-10 bg-slate-700 rounded-full mb-3 flex items-center justify-center text-white shadow-md"
          >
            <span class="text-lg">➕</span>
          </div>
          <span class="font-bold text-sm text-slate-900">Other</span>
        </button>
      </div>

      <input
        v-model="habitName"
        maxlength="50"
        class="mt-8 border w-full rounded-full border-blue-200 font-serif pl-4 py-3 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
        type="text"
        placeholder="Enter your habits here.........."
        @keyup.enter="handleSubmit"
      />
      <div class="text-sm mt-2 text-right text-red-400">
        {{ habitName.length }}/50
      </div>

      <div class="mt-10 text-center">
        <button
          @click="handleSubmit"
          :disabled="!habitName.trim()"
          class="bg-blue-400 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-300 transition-all active:scale-95 shadow-lg shadow-slate-200 disabled:opacity-50"
        >
          Add Habit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHabits } from "../UseHabits";
import type { HabitCategory } from "../types";

// 1. Logic from Composable
const { addHabit } = useHabits();

// 2. Local State for Form
const habitName = ref("");
const selectedCategory = ref<HabitCategory>("Other");

const emit = defineEmits<{
  (e: "close"): void;
}>();

const closeModal = () => {
  emit("close");
};

const handleSubmit = () => {
  if (habitName.value.trim()) {
    addHabit(habitName.value, selectedCategory.value);
    habitName.value = "";
    closeModal(); //
  }
};
</script>
