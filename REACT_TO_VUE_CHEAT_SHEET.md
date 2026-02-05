# React to Vue 3 (Composition API) Cheat Sheet

Use this guide to translate your React knowledge directly into Vue.

## 1. Components & File Structure

| Concept | React (`.tsx`) | Vue (`.vue`) |
| :--- | :--- | :--- |
| **File** | `function MyComponent() { ... }` | Single File Component (SFC) |
| **Logic** | Inside function body | Inside `<script setup lang="ts">` |
| **Template** | `return (JSX)` | Inside `<template>` |
| **Styles** | CSS-in-JS / CSS Modules | Inside `<style scoped>` |

### Example: Basic Component
```vue
<script setup lang="ts">
// 1. Logic goes here
</script>

<template>
  <!-- 2. HTML goes here -->
  <div class="container">Hello World</div>
</template>

<style scoped>
/* 3. Styles go here (scoped to this component) */
.container { color: blue; }
</style>
```

---

## 2. State Management (`useState` -> `ref`)

In Vue, we use `ref` for primitives and objects. **Crucial Difference**: You must access `.value` in the script, but **NOT** in the template.

| React | Vue (`<script setup>`) |
| :--- | :--- |
| `const [count, setCount] = useState(0)` | `const count = ref(0)` |
| `setCount(5)` | `count.value = 5` |
| `setCount(prev => prev + 1)` | `count.value++` (Direct mutation allowed!) |
| `{count}` (in JSX) | `{{ count }}` (in Template - no `.value` needed) |

**Example:**
```typescript
import { ref } from 'vue';

const count = ref(0);
const increment = () => {
    count.value++; // .value is required here!
};
```

---

## 3. Side Effects (`useEffect` -> `watch` / `onMounted`)

Vue splits `useEffect` into specific lifecycle hooks and watchers.

| React | Vue | Note |
| :--- | :--- | :--- |
| `useEffect(() => {}, [])` | `onMounted(() => {})` | Runs once when component mounts. |
| `useEffect(() => {}, [count])` | `watch(count, (newVal) => {})` | Runs when specific source changes. |
| `useEffect(() => { return () => cleanup() }, [])` | `onUnmounted(() => {})` | Cleanup function. |

**Example: LocalStorage Persistence**
```typescript
import { ref, watch, onMounted } from 'vue';

const todos = ref([]);

// "useEffect with dependency array" equivalent
watch(todos, (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
}, { deep: true }); // 'deep: true' needed for arrays/objects!

// "useEffect empty array" equivalent
onMounted(() => {
    todos.value = JSON.parse(localStorage.getItem('todos') || '[]');
});
```

---

## 4. Derived State (`useMemo` -> `computed`)

| React | Vue |
| :--- | :--- |
| `const double = useMemo(() => count * 2, [count])` | `const double = computed(() => count.value * 2)` |

Vue's `computed` automatically creates dependencies. You don't need a dependency array.

---

## 5. Props (`props` -> `defineProps`)

In `<script setup>`, props are declared using `defineProps`.

**React:**
```typescript
interface Props { title: string }
function Header({ title }: Props) { ... }
```

**Vue:**
```vue
<script setup lang="ts">
// Macro - no import needed
defineProps<{
  title: string;
  isActive?: boolean; // Optional prop
}>();
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

---

## 6. Events / Callbacks (`props.onEvent` -> `emit`)

In React, you pass functions as props. In Vue, you **emit** events up to the parent.

**Child Component (Vue):**
```vue
<script setup lang="ts">
// Define what events this component can emit
const emit = defineEmits<{
  (e: 'delete', id: number): void;
  (e: 'update', value: string): void;
}>();

const handleDelete = () => {
  emit('delete', 123); // Emits event to parent
};
</script>

<template>
    <button @click="handleDelete">Delete</button>
</template>
```

**Parent Component (Vue):**
```vue
<template>
  <!-- Listen for 'delete' event with @delete -->
  <ChildComponent @delete="handleDelete" />
</template>
```

---

## 7. Logic Reuse (Custom Hooks -> Composables)

They are almost identical! We just call them "Composables" and convention is `useFeature.ts`.

**useCounter.ts**
```typescript
import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;

  return { count, increment };
}
```

**Component.vue**
```vue
<script setup lang="ts">
import { useCounter } from './useCounter';
const { count, increment } = useCounter();
</script>
```

---

## Summary of Syntax
| Logic | React JSX | Vue Template |
| :--- | :--- | :--- |
| **Loop** | `{items.map(item => <li key={item.id}>...</li>)}` | `<li v-for="item in items" :key="item.id">...</li>` |
| **Condition** | `{isOpen && <div>...</div>}` | `<div v-if="isOpen">...</div>` |
| **Event** | `onClick={handleClick}` | `@click="handleClick"` |
| **Binding** | `value={text}` | `v-model="text"` (Two-way binding!) |
| **Class** | `className="btn"` | `class="btn"` |
| **Dynamic Class**| `className={isActive ? 'active' : ''}` | `:class="{ active: isActive }"` |
