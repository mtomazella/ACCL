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

impl Routine {
    pub fn empty() -> Routine {
        Routine {
            name: "EMPTY_ROUTINE".to_owned(),
            curve_type: RoutineCurveType::Linear,
            loops: false,
            points: vec![],
        }
    }

    pub fn is_empty(&self) -> bool {
        self.name == "EMPTY_ROUTINE".to_owned()
    }
}

#[tauri::command]
pub fn save_routine(routine: Routine) {
    println!("{:?}", routine)
}
