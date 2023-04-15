use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum RoutineCurveType {
    Linear,
    Monotone,
    StepAfter,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RoutinePoint {
    time: f32,
    current: f32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Routine {
    pub name: String,
    pub curve_type: RoutineCurveType,
    pub loops: bool,
    pub points: Vec<RoutinePoint>,
}

impl Routine {
    pub fn new() -> Routine {
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
