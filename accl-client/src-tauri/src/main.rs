#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod communication;
mod routines;

use communication::{
    serial_process,
    upload::{UploadBuffer, UploadBufferMutex},
};
use routines::save_routine;
use tauri::{async_runtime::Mutex, App, Wry};

use crate::communication::upload::upload_routine;

fn setup(app: &mut App<Wry>) -> Result<(), Box<dyn std::error::Error>> {
    let app_handle = app.handle();

    tauri::async_runtime::spawn(async move { serial_process(&app_handle).await });

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_routine, upload_routine])
        .manage(UploadBufferMutex(Mutex::new(UploadBuffer::new())))
        .setup(setup)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
