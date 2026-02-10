<template>
  <div class="space-y-4 relative">
    <div
      v-if="streakCount > 0"
      class="flex items-center gap-2 mb-4 bg-orange-50 w-fit px-4 py-2 rounded-full border border-orange-100 animate-in fade-in slide-in-from-left duration-700"
    >
      <span class="text-xl animate-ping">🔥</span>
      <span class="font-bold text-orange-600 tracking-tight">
        {{ streakCount }} Day Streak
      </span>
    </div>

    <div
      v-if="isAllCompleted"
      class="bg-green-50 border border-green-100 rounded-2xl p-6 mb-6 flex flex-col items-center justify-center gap-2 animate-in slide-in-from-top duration-500"
    >
      <span class="text-4xl animate-bounce">🎉</span>
      <h3 class="text-green-800 font-bold text-lg">Congratulations!!!!</h3>
      <p class="text-green-600 text-sm">
        You've completed all your habits for today.
      </p>
    </div>

    <div
      v-for="habit in habits"
      :key="habit.id"
      class="flex items-center justify-between p-5 bg-white rounded-4xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
    >
      <div class="flex items-center gap-4 flex-1">
        <button
          @click="toggleStatus(habit.id)"
          :class="[
            'w-8 h-8 border-2 flex items-center justify-center transition-colors shrink-0',
            habit.status === 'completed'
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-slate-200 hover:border-blue-400',
          ]"
        >
          <span v-if="habit.status === 'completed'">✓</span>
        </button>

        <div class="flex-1">
          <div v-if="editingId === habit.id" class="flex items-center gap-2">
            <input
              v-model="editText"
              @keyup.enter="handleSaveEdit(habit.id)"
              @keyup.esc="editingId = null"
              class="border-b-2 border-blue-400 focus:outline-none text-slate-800 font-bold w-full bg-transparent py-1"
              v-focus
            />
            <div class="flex gap-2">
              <button
                @click="handleSaveEdit(habit.id)"
                class="text-green-500 text-xs font-bold uppercase pl-2 pt-6"
              >
                Save
              </button>
              <button
                @click="editingId = null"
                class="text-slate-400 text-xs font-bold uppercase pl-2 pt-6"
              >
                Cancel
              </button>
            </div>
          </div>

          <div v-else>
            <h4
              :class="[
                'font-bold text-slate-800 transition-all',
                habit.status === 'completed'
                  ? 'line-through text-slate-400'
                  : '',
              ]"
            >
              {{
                habit.category === "Health"
                  ? "🍎"
                  : habit.category === "Study"
                    ? "📚"
                    : habit.category === "Workout"
                      ? "🤸"
                      : habit.category === "Other"
                        ? "➕"
                        : "✨"
              }}
              - {{ habit.name }}
            </h4>
            <div class="flex gap-2 mt-1">
              <span
                class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-700 uppercase tracking-tighter"
              >
                {{ habit.category }}
              </span>
              <span
                class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-700 uppercase tracking-tighter"
              >
                {{ habit.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-1">
        <div v-if="editingId !== habit.id">
          <button
            v-if="habit.status !== 'completed'"
            @click="startEdit(habit)"
            class="p-2 text-slate-300 hover:text-blue-400 rounded-full transition-colors w-10"
            title="Edit"
          >
            <span class="text-xl">✏️</span>
          </button>
          <button
            @click="deletingId = habit.id"
            v-if="habit.status !== 'completed'"
            class="p-2 text-slate-300 hover:bg-red-100 rounded-full transition-colors"
            title="Delete"
          >
            <span class="text-xl">🗑️</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="deletingId"
      class="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
    >
      <div
        class="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 text-center animate-in zoom-in duration-200"
      >
        <div
          class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span class="text-3xl">🚨</span>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">Are you sure?</h3>
        <p class="text-slate-500 mb-8 text-sm">
          Once you delete this habit, it’s gone for good.
        </p>
        <div class="flex flex-col gap-2">
          <button
            @click="handleDelete(deletingId)"
            class="w-full py-4 rounded-2xl font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200"
          >
            Yes, Delete it
          </button>
          <button
            @click="deletingId = null"
            class="w-full py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useHabits } from "../UseHabits";

const {
  habits,
  streakCount,
  toggleStatus,
  deleteHabit,
  updateHabitName,
  recordDailyWin,
  resetHabitsIfNewDay, // <-- exposed from composable
} = useHabits();

// local states for deleting and editing habits
const deletingId = ref<string | null>(null);
const editingId = ref<string | null>(null);
const editText = ref("");

// run reset when component mounts
onMounted(() => {
  localStorage.setItem("habit-last-reset", "2026-02-09"); //to test
  if (typeof resetHabitsIfNewDay === "function") {
    resetHabitsIfNewDay();
  }
});

// congratulations message(completion feedback)
const isAllCompleted = computed(() => {
  return (
    habits.value.length > 0 &&
    habits.value.every((h) => h.status === "completed")
  );
});

// watches to see if all habits are checked
watch(isAllCompleted, (newValue) => {
  recordDailyWin(newValue);
});
// starts editing a habit by setting the editingId
const startEdit = (habit: any) => {
  editingId.value = habit.id;
  editText.value = habit.name;
  deletingId.value = null;
};
// saves the edited habit name and exits edit mode
const handleSaveEdit = (id: string) => {
  if (editText.value.trim()) {
    updateHabitName(id, editText.value);
    editingId.value = null;
  }
};

//handle delete with confirmation modal
const handleDelete = (id: string) => {
  deleteHabit(id);
  deletingId.value = null;
};
// v-focus directive to focus input when editing
const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
};
</script>
