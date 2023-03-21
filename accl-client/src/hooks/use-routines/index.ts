import { invoke } from '@tauri-apps/api'

export type RoutineInterpolation = 'linear' | 'stepAfter' | 'monotone'

export type Routine = {
  name: string | undefined
  curveType: RoutineInterpolation
  loop: boolean
  points: { time: number; current: number }[]
}

export const useRoutines = () => {
  const formatForRust = ({ curveType, loop, name, points }: Routine) => ({
    name: !name ? 'NO_NAME' : name,
    curve_type: `${curveType.slice(0, 1).toUpperCase()}${curveType.slice(1)}`,
    loops: loop,
    points,
  })

  const upload = (routine: Routine) => {
    console.log(routine)
    // invoke('upload_routine', routine)
  }

  const save = (routine: Routine) => {
    if (
      !(
        typeof window !== 'undefined' &&
        window !== undefined &&
        window.__TAURI_IPC__ !== undefined
      )
    )
      return
    invoke('save_routine', {
      routine: formatForRust(routine),
    })
  }

  return {
    upload,
    save,
  }
}
