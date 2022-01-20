// extern crate ferris_says;
mod greetings;
// use std::io::{stdout, BufWriter};

fn main() {
    // let stdout = stdout();
    // let message = String::from("Hello fellow Rustaceans!");
    // let width = message.chars().count();

    // let mut writer = BufWriter::new(stdout.lock());
    // greetings.hello(message.as_bytes(), width, &mut writer).unwrap();
    greetings::hello()
}