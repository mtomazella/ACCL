#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod communication;
mod routines;

use communication::metrics::serial_listener_process;
use routines::save_routine;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_routine])
        .setup(|app| {
            let app_handle = app.handle();

            tauri::async_runtime::spawn(async move { serial_listener_process(&app_handle) });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
