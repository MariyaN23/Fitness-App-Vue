<script setup lang="ts">
import Welcome from "./components/pages/Welcome.vue";
import Layout from "./components/layouts/Layout.vue";
import Dashboard from "./components/pages/Dashboard.vue";
import Workout from "./components/pages/Workout.vue";
import { computed, ref } from "vue";
import { workoutProgram } from "./utils";
import type { ExerciseData } from "./types/workout.types.ts";

const defaultData: ExerciseData = {}
for (let workoutIdx in workoutProgram) {
  const workoutData = workoutProgram[workoutIdx]
  defaultData[workoutIdx] = {}
  for (let e of workoutData.workout) {
    defaultData[workoutIdx][e.name] = ""
  }
}
const selectedDisplay = ref(1)
const data = ref(defaultData)
const selectedWorkout = ref(-1)

const isWorkoutComplete = computed(() => {
  const currentWorkout = data.value?.[selectedWorkout.value]
  if (!currentWorkout) {
    return false
  }

  const isCompleteCheck = Object.values(currentWorkout).every(ex => !!ex)
  console.log('is complete:', isCompleteCheck)
  return isCompleteCheck
})

const firstIncompleteWorkoutIndex = computed(() => {
  const allWorkouts = data.value
  if (!allWorkouts) return -1

  for (const [index, workout] of Object.entries(allWorkouts)) {
    const isComplete = Object.values(workout).every(ex => !!ex)
    if (!isComplete) {
      return parseInt(index)
    }
  }
  return -1
})

const handleChangeDisplay = (idx: number) => {
  selectedDisplay.value = idx
}

const handleSelectedWorkout = (idx: number) => {
  selectedDisplay.value = 3
  selectedWorkout.value = idx
}

const handleSaveWorkout = () => {
  localStorage.setItem('workouts', JSON.stringify(data.value))
  selectedDisplay.value = 2
  selectedDisplay.value = -1
}
</script>

<template>
  <Layout>
    <Welcome :handleChangeDisplay="handleChangeDisplay" v-if="selectedDisplay === 1" />
    <Dashboard
        :firstIncompleteWorkoutIndex="firstIncompleteWorkoutIndex"
        :handleSelectedWorkout="handleSelectedWorkout"
        :handleChangeDisplay="handleChangeDisplay"
        v-if="selectedDisplay === 2"
    />
    <Workout
        :handleSaveWorkout="handleSaveWorkout"
        :isWorkoutComplete="isWorkoutComplete"
        v-if="workoutProgram?.[selectedWorkout]"
        :data="data"
        :selectedWorkout="selectedWorkout"
    />
  </Layout>
</template>

<style scoped>
</style>
