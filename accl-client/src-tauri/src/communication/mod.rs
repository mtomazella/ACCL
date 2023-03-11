use std::{
    io::{self},
    str,
    time::Duration,
};

use serde::{Deserialize, Serialize};
use serialport::{self, SerialPort};
use tauri::Manager;

#[derive(Clone, Copy, Deserialize)]
pub struct RawDataBundle {
    tp: f64, // temperature
    t: f64,  // tension
    tg: f64, // target current
    c: f64,  // actual current
    f: i8,   // fan percentage
}

impl TryFrom<&str> for RawDataBundle {
    type Error = serde_json::Error;

    fn try_from(string_data: &str) -> Result<Self, serde_json::Error> {
        let json_data: Result<Self, serde_json::Error> = serde_json::from_str(string_data);
        json_data
    }
}

#[derive(Clone, Copy, Serialize)]
pub struct DataBundle {
    temperature: f64,
    tension: f64,
    target_current: f64,
    actual_current: f64,
    fan_percentage: i8,
    power: f64,
}

impl From<RawDataBundle> for DataBundle {
    fn from(raw: RawDataBundle) -> Self {
        DataBundle {
            actual_current: raw.c,
            fan_percentage: raw.f,
            target_current: raw.tg,
            temperature: raw.tp,
            tension: raw.t,
            power: raw.t * raw.c,
        }
    }
}

fn handle_new_measurement<R: tauri::Runtime>(manager: &impl Manager<R>, str_metrics: &str) {
    let parsed_json = RawDataBundle::try_from(str_metrics);
    let raw = match parsed_json {
        Ok(value) => value,
        Err(_) => {
            println!("Invalid data format.");
            return ();
        }
    };
    let data = DataBundle::from(raw);
    emit_new_metrics_event(manager, data);
}

fn emit_new_metrics_event<R: tauri::Runtime>(manager: &impl Manager<R>, payload: DataBundle) {
    manager.emit_all("new_metrics", payload).unwrap();
}

fn establish_serial_connection(port_code: &str) -> Result<Box<dyn SerialPort>, serialport::Error> {
    serialport::new(port_code, 9600)
        .timeout(Duration::from_millis(10))
        .open()
}

pub fn serial_listener_process<R: tauri::Runtime>(manager: &impl Manager<R>) {
    let ports = serialport::available_ports().expect("No ports found!");

    if ports.len() == 0 {
        eprintln!("No ports found");
        return;
    }

    for p in ports.clone() {
        println!("{}", p.port_name);
    }

    let port_code = ports[0].port_name.as_str();

    let mut open_port = establish_serial_connection(port_code).expect("Failed to open port");

    let mut serial_buf: Vec<u8> = vec![0; 64];
    let mut str_buffer: String = "".to_owned();
    loop {
        match open_port.read(serial_buf.as_mut_slice()) {
            Ok(t) => {
                let parsed_result = std::str::from_utf8(&serial_buf[..t]);
                match parsed_result {
                    Ok(string_data) => {
                        if string_data.ends_with('}') {
                            str_buffer.push_str(string_data);
                        }
                        if string_data.starts_with('{') {
                            str_buffer = string_data.to_owned();
                        }
                        if str_buffer.starts_with('{') && str_buffer.ends_with('}') {
                            handle_new_measurement(manager, &str_buffer);
                            str_buffer = "".to_owned();
                        }
                    }
                    Err(_) => println!("Invalid data received"),
                };
            }
            Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (),
            Err(e) => match e.kind() {
                io::ErrorKind::BrokenPipe => {
                    println!("Connection lost.");
                    println!("Attempting to restart connection...");

                    let new_available_ports = serialport::available_ports();
                    if !new_available_ports.is_ok() {
                        println!("No ports open.");
                        continue;
                    }
                    if !new_available_ports
                        .unwrap()
                        .iter()
                        .any(|port| port.port_name == port_code)
                    {
                        println!("Selected port not open.");
                        continue;
                    }

                    let opening_attempt = establish_serial_connection(port_code);
                    if !opening_attempt.is_ok() {
                        println!("Failed to open port.");
                        continue;
                    }

                    println!("Reconnecting...");
                    open_port = opening_attempt.unwrap();
                }
                _ => eprintln!("{:?}", e),
            },
        }
        std::thread::sleep(Duration::from_millis(500));
    }
}
