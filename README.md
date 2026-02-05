# Vue Learning Challenge: Habit Forge (TypeScript Edition)

Welcome to **Habit Forge**! This challenge is designed to help you master **Vue 3**, the **Composition API**, and most importantly, **strict TypeScript**, while addressing common pitfalls like state persistence and Clean Code.

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

### 2. Technical Stack & TypeScript Mastery (Read Carefully)
This challenge focuses on **Type Safety** and **Documentation**.
- **Framework**: Vue 3 (Composition API with `<script setup>`).
- **Language**: TypeScript (**Strict Level: High**).
    - **NO `any` allowed**: You must define proper types for everything.
    - **Interfaces**: Define a `Habit` interface in a separate file (e.g., `src/types.ts`).
    - **Events**: Use generic `defineEmits<{ (e: 'delete', id: number): void }>()` notation.
    - **Props**: Use generic `defineProps<{ habit: Habit }>()` notation.
- **Styling**: TailwindCSS (optional but recommended) or plain CSS.

### 3. Documentation & "Why"
Code is read more often than it is written.
- **JSDoc/TSDoc**: Every component and helper function **MUST** have a TSDoc comment explaining *what* it does and *why*.
    - Example:
      ```typescript
      /**
       * Calculates the current streak based on daily completion.
       * Reset rule: If last completion was > 48 hours ago, streak resets to 0.
       * @param history - Array of date strings
       * @returns number - Current streak
       */
      ```
- **Rationale**: If you make a design decision (e.g., "I used `watch` instead of `watchEffect`"), add a comment explaining why.

### 4. Key Learning Objectives
- **Data Modeling**: How to represent a Habit with a status that resets daily but preserves streak history.
- **State Management**: Use `ref` and `computed` correctly.
- **Props & Events**: strictly typed communication between parent and child.

## AI Usage Policy (Strict Learning Mode)
- **Allowed**: Asking AI "How do I type a Vue emit?" or "Explain this TypeScript error".


## Bonus Challenges
1.  **Strict Union Types**: Use a union type for status (e.g., `'pending' | 'completed'`) instead of a boolean or string.
2.  **Streak Logic**: Implement "New Day" logic. If I checking off today, my streak goes up. If I missed yesterday, my streak forces a reset.
3.  **Confetti**: Trigger a generic confetti event (typed!) when all habits are done.

## Setup
```bash
npm install
npm run dev
```

Good luck! Forge those coding habits!
