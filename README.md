# Vue Learning Challenge: Habit Forge

Welcome to **Habit Forge**! This challenge is designed to help you master **Vue 3**, the **Composition API**, and **TypeScript**, while addressing common pitfalls like state persistence and Clean Code.

## The Mission
Build a **Habit Tracker** application where users can define daily habits, track their completion, and see their streaks. Think of it as a personal dashboard for self-improvement.

## Core Requirements

### 1. Functional Requirements
- **Habit Management (CRUD)**:
    - **Create**: Add a new habit (e.g., "Drink 2L Water", "Read 30 mins").
    - **Read**: View the list of active habits.
    - **Update**: Edit a habit's name.
    - **Delete**: Remove a habit.
- **Daily Tracking**:
    - Toggle a habit as "Completed" for the current day.
    - Visual feedback when a habit is done (e.g., green checkmark, strikethrough).
- **Persistence (Critical)**:
    - Data **MUST** persist across page reloads.
    - Use `localStorage` to save the state.
    - **Bug Trap**: Ensure you are not overwriting user data with default data on every reload!
- **Data Structure**:
    - Each habit should track at least: `id`, `name`, `streak` (current streak count), and `completedToday` (boolean).

### 2. Technical Stack
- **Framework**: Vue 3 (Composition API with `<script setup>`).
- **Language**: TypeScript (Strict mode).
- **Build Tool**: Vite.
- **Styling**: TailwindCSS (optional but recommended) or plain CSS.

### 3. Key Learning Objectives (Focus Areas)
- **State Management**: Use **Ref** and **Reactive** correctly. You may use **Pinia** if you want, but simple `ref`s or a composable (`useHabits`) are sufficient.
- **Lifecycle Hooks**: Understand `onMounted` and `watch` for persistence.
- **Component Splitting**: Do NOT put everything in `App.vue`.
    - Example: `HabitList.vue`, `HabitItem.vue`, `AddHabitForm.vue`.
- **Props & Events**: Pass data down via props and bubble events up via `emit` (or use v-model).

## AI Usage Policy (Learning Mode)
Since this is a learning exercise, you **can** use AI tools (ChatGPT, Claude, Copilot) to explain concepts or debug errors.
- **Goal**: Understand *why* it works.
- **Verification**: Be prepared to explain your `watch` logic or how `v-model` works under the hood.

## Bonus Challenges
1.  **Streak Calculation**: Logic to reset `completedToday` if it's a new day, but keep the `streak` if they did it yesterday.
2.  **Confetti**: Trigger a confetti explosion when all habits are done!
3.  **Analytics**: A simple chart showing completion rates (using a library or CSS).

## Setup
```bash
npm install
npm run dev
```

Good luck! Forge those habits!
