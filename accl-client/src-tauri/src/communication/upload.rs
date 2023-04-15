use serialport::SerialPort;
use std::time::Instant;
use tauri::State;
use tokio::sync::{Mutex, MutexGuard};

use crate::routines::Routine;

#[derive(Debug, Clone)]
pub struct UploadBuffer {
    pub routine: Routine,
    pub buffer: String,
    pub zero: Instant,
    pub last_upload_finished: Instant,
    pub last_upload_request: Instant,
}

impl UploadBuffer {
    pub fn new() -> UploadBuffer {
        let now = Instant::now();
        return UploadBuffer {
            routine: Routine::new(),
            buffer: "".to_owned(),
            zero: now.clone(),
            last_upload_finished: now.clone(),
            last_upload_request: now,
        };
    }

    pub fn is_initialized(&self) -> bool {
        return !self.last_upload_request.eq(&self.zero);
    }

    pub fn upload_pending(&self) -> bool {
        if !self.is_initialized() {
            return false;
        };
        return self.last_upload_request.gt(&self.last_upload_finished);
    }
}

pub struct UploadBufferMutex(pub Mutex<UploadBuffer>);

#[tauri::command]
pub async fn upload_routine(
    routine: Routine,
    upload_buffer_state: State<'_, UploadBufferMutex>,
) -> Result<(), ()> {
    let mut upload_buffer = upload_buffer_state.0.lock().await;
    let routine_clone = upload_buffer.routine.points.clone();
    let new_string_buffer = serde_json::to_string(&(upload_buffer.routine.clone())).unwrap();
    if upload_buffer.upload_pending() {
        return Ok(());
    }
    upload_buffer.routine = routine;
    upload_buffer.buffer = new_string_buffer;
    upload_buffer.last_upload_request = Instant::now();
    return Ok(());
}

fn stringify_routine(routine: &Routine) -> String {
    return serde_json::to_string(routine).unwrap();
}

pub fn handle_routine_upload(
    serial_port: &mut Box<dyn SerialPort>,
    upload_buffer: &MutexGuard<UploadBuffer>,
) -> bool {
    serial_port.write_all(stringify_routine(&upload_buffer.routine).as_bytes());
    return true;
}
