<script setup lang="ts">
import { workoutProgram } from "../utils";

defineProps<{
  handleSelectedWorkout: (id: number) => void
}>()

const workoutTypes = ["Push", "Pull", "Legs"]
</script>

<template>
  <section id="grid">
    <div @click="()=>handleSelectedWorkout(workoutIdx)" :key="workoutIdx" v-for="(_, workoutIdx) in Object.keys(workoutProgram)"
         class="card-button plan-card">
      <div>
        <p>Day {{ workoutIdx < 9 ? `0${workoutIdx + 1}` : workoutIdx + 1 }}</p>
        <i class="fa-solid fa-dumbbell" v-if="workoutIdx % 3 == 0"></i>
        <i class='fa-solid fa-weight-hanging' v-if="workoutIdx % 3 == 1"></i>
        <i class="fa-solid fa-bolt" v-if="workoutIdx % 3 == 2"></i>
      </div>
      <h3>{{ workoutTypes[workoutIdx % 3] }}</h3>
    </div>
  </section>
</template>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

#grid div:disabled {
  box-shadow: none;
  cursor: not-allowed;

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

@media (min-width: 640px) {
  #grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>