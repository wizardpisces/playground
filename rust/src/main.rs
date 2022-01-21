mod greetings;
mod lifetime;
mod traits;

use crate::lifetime::test;
use traits::basic::{Hello, Student};
use traits::error::{test as testError};
use traits::from::{from as testFrom};
// use std::io::{stdout, BufWriter};

fn main() {
    // let stdout = stdout();
    let message = String::from("Hello fellow Rustaceans!");
    let width = message.chars().count();
    println!("{}", width);
    // let mut writer = BufWriter::new(stdout.lock());
    // greetings.hello(message.as_bytes(), width, &mut writer).unwrap();
    greetings::hello();

    // lifetime
    test();

    //traits

    // let s = traits::basic::Student {};
    let s = Student {};
    s.say_hi();
    
    let result = testError();
    eprintln!("{:?}",result);

    testFrom();
}
