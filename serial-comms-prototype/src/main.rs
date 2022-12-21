use serialport;
use std::{
    io::{self, Write},
    time::Duration,
};

fn main() {
    let ports = serialport::available_ports().expect("No ports found!");
    for p in ports {
        println!("{}", p.port_name);
    }

    let mut port = serialport::new("/dev/ttyUSB0", 115_200)
        .timeout(Duration::from_millis(10))
        .open()
        .expect("Failed to open port");

    let mut serial_buf: Vec<u8> = vec![0; 1000];
    println!(
        "Receiving data on {} at {} baud:",
        port.as_ref().name().unwrap(),
        port.as_ref().baud_rate().unwrap()
    );
    loop {
        match port.read(serial_buf.as_mut_slice()) {
            Ok(t) => io::stdout().write_all(&serial_buf[..t]).unwrap(),
            Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (),
            Err(e) => eprintln!("{:?}", e),
        }
    }
}
