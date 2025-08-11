export type IWorkoutProgram = {
    [key: number]: WorkoutDay
}
type WorkoutDay = {
    warmup: Exercise[]
    workout: Exercise[]
}

type Exercise = {
    name: string
    sets: number
    reps: number
}

export type IExerciseDescriptions = {
    [exerciseName: string]: string
}

export type ExerciseData = {
    [key: number]: IExerciseDescriptions
}

export type IGymHealthFacts = string[]
