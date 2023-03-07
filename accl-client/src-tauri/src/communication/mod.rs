use serde::Serialize;
use tauri::Manager;

#[derive(Clone, Copy, Serialize)]
pub struct DataBundle {
    temperature: f64,
    tension: f64,
    target_current: f64,
    actual_current: f64,
    fan_percentage: i8,
}

static CURRENT_DATA: DataBundle = DataBundle {
    temperature: 53.0,
    actual_current: 1.45,
    fan_percentage: 80,
    target_current: 2.0,
    tension: 11.98,
};

#[tauri::command]
pub fn get_current_metrics() -> DataBundle {
    CURRENT_DATA
}

pub fn serial_listener_process<R: tauri::Runtime>(manager: &impl Manager<R>) {
    loop {
        manager
            .emit_all("new_metrics", String::from("Teste"))
            .unwrap();
    }
}
