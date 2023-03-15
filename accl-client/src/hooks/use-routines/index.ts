import { invoke } from '@tauri-apps/api'

export type RoutineInterpolation = 'linear' | 'stepAfter' | 'monotone'

export type Routine = {
  name: string | undefined
  curveType: RoutineInterpolation
  loop: boolean
  points: { time: number; current: number }[]
}

export const useRoutines = () => {
  const upload = (routine: Routine) => {
    console.log(routine)
    // invoke('upload_routine', routine)
  }

  return {
    upload,
  }
}
