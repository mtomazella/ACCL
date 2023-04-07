use std::{io, time::Duration};

use serialport::SerialPort;
use tauri::{Event, Manager};

use crate::routines::Routine;

use self::metrics::{define_new_str_buffer, handle_new_measurement};

pub mod metrics;
pub mod upload;

pub fn establish_serial_connection(
    port_code: &str,
) -> Result<Box<dyn SerialPort>, serialport::Error> {
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
    let mut upload_buf: Routine = Routine::empty();

    manager.state()

    manager.listen_global("upload", move |event| {
        if event.payload().is_none() {
            return ();
        }
        let payload: Result<Routine, serde_json::Error> =
            serde_json::from_str(event.payload().unwrap());
        match payload {
            Ok(routine) => {
                open_port.write("aaaa".as_bytes());
            }
            Err(_) => return (),
        }
    });

    // loop {
    //     match open_port.read(serial_buf.as_mut_slice()) {
    //         Ok(t) => {
    //             let parsed_result = std::str::from_utf8(&serial_buf[..t]);
    //             match parsed_result {
    //                 Ok(string_data) => {
    //                     str_buffer = define_new_str_buffer(str_buffer, string_data);
    //                     if str_buffer.starts_with('{') && str_buffer.ends_with('}') {
    //                         handle_new_measurement(manager, &str_buffer);
    //                         str_buffer = "".to_owned();
    //                     }
    //                 }
    //                 Err(_) => println!("Invalid data received"),
    //             };
    //         }
    //         Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (),
    //         Err(e) => match e.kind() {
    //             io::ErrorKind::BrokenPipe => {
    //                 println!("Connection lost.");
    //                 println!("Attempting to restart connection...");

    //                 let new_available_ports = serialport::available_ports();
    //                 if !new_available_ports.is_ok() {
    //                     println!("No ports open.");
    //                     continue;
    //                 }
    //                 if !new_available_ports
    //                     .unwrap()
    //                     .iter()
    //                     .any(|port| port.port_name == port_code)
    //                 {
    //                     println!("Selected port not open.");
    //                     continue;
    //                 }

    //                 let opening_attempt = establish_serial_connection(port_code);
    //                 if !opening_attempt.is_ok() {
    //                     println!("Failed to open port.");
    //                     continue;
    //                 }

    //                 println!("Reconnecting...");
    //                 open_port = opening_attempt.unwrap();
    //             }
    //             _ => eprintln!("{:?}", e),
    //         },
    //     }
    // }
}
