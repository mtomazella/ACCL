#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod communication;
mod routines;

use communication::serial_listener_process;
use routines::save_routine;
use tauri::{App, Wry};

fn setup(app: &mut App<Wry>) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();

    tauri::async_runtime::spawn(async move { serial_listener_process(&app_handle) });

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_routine])
        .setup(setup)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
