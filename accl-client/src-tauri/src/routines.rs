use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub enum RoutineCurveType {
    Linear,
    Monotone,
    StepAfter,
}

#[derive(Debug, Deserialize)]
pub struct RoutinePoint {
    time: f32,
    current: f32,
}

#[derive(Debug, Deserialize)]
pub struct Routine {
    name: String,
    curve_type: RoutineCurveType,
    loops: bool,
    points: Vec<RoutinePoint>,
}

#[tauri::command]
pub fn save_routine(routine: Routine) {
    println!("{:?}", routine)
}
