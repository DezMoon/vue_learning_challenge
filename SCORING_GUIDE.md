# Habit Forge: Scoring & Self-Review Guide

Use this guide to self-assess your work before submitting.

## Scoring Rubric (Out of 10 per Category)

### 1. Vue 3 Composition API (Weight: 25%)
- **9-10**: Clean use of `<script setup>`. Correct usage of `ref` vs `reactive`. Logic extracted into Composables (`useHabits.ts`) if complex.
- **7-8**: Good usage, but logic is mixed inside components.
- **5-6**: Mixing Options API and Composition API. Misunderstanding `.value`.
- **<5**: "Div soup" or direct DOM manipulation (avoid `document.getElementById`).

### 2. State & Persistence (Weight: 25%)
- **9-10**: **Flawless Persistence**. Data loads on mount and saves on change. Does NOT overwrite local data with defaults on refresh. Handles "New Day" logic correctly (optional bonus).
- **7-8**: Standard persistence works.
- **5-6**: Buggy persistence (losses data occasionally).
- **<5**: No persistence or broken implementation (e.g., loads default data every time).

### 3. Component Architecture (Weight: 20%)
- **9-10**: Small, single-responsibility components (`HabitItem`, `HabitForm`). Props are typed (`defineProps<{ habit: Habit }>`). Emits are typed.
- **7-8**: Decent split. Some prop drilling.
- **5-6**: Logic dump in `App.vue`.
- **<5**: One giant file.

### 4. TypeScript & Code Quality (Weight: 15%)
- **9-10**: Strict types (Interfaces for `Habit`). No `any`. Clear variable names. No unused code/imports.
- **7-8**: Good types. Minor `any` usage.
- **5-6**: "AnyScript". Ignoring TS errors. Dead code left in files.
- **<5**: Console errors on startup.

### 5. UI/UX (Weight: 15%)
- **9-10**: Responsive. Polished. Visual feedback for interactions (hover, click, completion).
- **7-8**: Functional and neat.
- **5-6**: Barebones or broken layout on mobile.
- **<5**: Unstyled HTML.

## Red Flags (Avoid These!)
- **Copy-Pasting**: Using code you don't understand.
- **Console Errors**: `Uncaught TypeError` or Reactivity loss warnings.
- **Mutating Props**: Changing `props.habit.name` directly (use emits!).

## "The Fixes" (Addressing Past Mistakes)
- **Check**: Did you remove unused imports/components?
- **Check**: Did you type your variables?
- **Check**: logical flow of `useEffect` (React) equivalent in Vue (`watch`/`onMounted`).
