<script setup lang="ts">
import { workoutProgram } from "../utils";

const {firstIncompleteWorkoutIndex, handleSelectedWorkout} = defineProps<{
  firstIncompleteWorkoutIndex: number
  handleSelectedWorkout: (id: number) => void
  handleResetPlan: ()=> void
}>()

const workoutTypes = ["Push", "Pull", "Legs"]
const changeSelectedWorkout = (id: number): void => {
  if (id > firstIncompleteWorkoutIndex) return
  handleSelectedWorkout(id)
}
</script>

<template>
  <section id="grid">
    <div :class="`card-button plan-card ${workoutIdx > firstIncompleteWorkoutIndex && 'disabled-plan-card'}`"
         @click="()=>changeSelectedWorkout(workoutIdx)" :key="workoutIdx"
         v-for="(_, workoutIdx) in Object.keys(workoutProgram)">
      <div>
        <p>Day {{ workoutIdx < 9 ? `0${workoutIdx + 1}` : workoutIdx + 1 }}</p>
        <i class="fa-solid fa-dumbbell" v-if="workoutIdx % 3 == 0"></i>
        <i class="fa-solid fa-weight-hanging" v-if="workoutIdx % 3 == 1"></i>
        <i class="fa-solid fa-bolt" v-if="workoutIdx % 3 == 2"></i>
      </div>
      <h3>{{ workoutTypes[workoutIdx % 3] }}</h3>
    </div>
    <div @click="handleResetPlan" :class="`card-button plan-card-reset ${firstIncompleteWorkoutIndex === 0 && 'disabled-plan-card'}`">
      <p>Reset</p>
      <i class="fa-solid fa-rotate-left"></i>
    </div>
  </section>
</template>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

#grid button {
  width: 100%;
}

.plan-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.plan-card div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.plan-card-reset {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
}

.disabled-plan-card {
  box-shadow: none;
  cursor: not-allowed;
  opacity: 0.5;
}

.disabled-plan-card:hover {
  border: 1px solid var(--border-secondary);
}

@media (min-width: 640px) {
  #grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>