<template>
  <div
    class="container justify-self-center min-h-screen bg-[#fafafa] text-slate-900 px-4 py-8 sm:px-6 lg:px-8"
  >
    <div class="max-w-3xl mx-auto">
      <header class="mb-12">
        <h1
          class="font-serif text-4xl sm:text-6xl text-slate-900 mb-4 tracking-tight"
        >
          Welcome to your
          <span class="italic text-blue-300">Habit Tracker</span>
        </h1>
        <p class="text-slate-500 text-lg sm:text-xl max-w-lg leading-relaxed">
          Stronger routines start with small daily wins. Track your progress,
          one day at a time.
        </p>
      </header>

      <div class="flex items-center justify-between mb-6">
        <h2
          class="text-sm font-semibold text-slate-400 uppercase tracking-wider"
        >
          Today's Habits
        </h2>
        <button
          @click="openModal"
          class="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-400"
        >
          + Quick Add
        </button>
      </div>

      <div
        class="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm flex flex-col items-center text-center"
      >
        <div
          class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6"
        >
          <img src="../assets/icons8-no-drugs-100.png" alt="" />
        </div>

        <h3 class="text-xl font-medium text-slate-800 mb-2">
          No habits tracked yet
        </h3>
        <p class="text-slate-500 mb-8 max-w-xs mx-auto">
          Kick off your journey to better habits—add your first habit today!
        </p>

        <button
          @click="openModal"
          class="bg-blue-400 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-300 transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
          + Add First Habit
        </button>
      </div>
    </div>
    <HabitForm v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HabitForm from "./HabitForm.vue";
const isModalOpen = ref(false);
const openModal = () => (isModalOpen.value = true);
</script>
