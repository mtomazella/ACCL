#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod communication;

use communication::serial_listener_process;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .setup(|app| {
            let app_handle = app.handle();

            tauri::async_runtime::spawn(async move { serial_listener_process(&app_handle) });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
