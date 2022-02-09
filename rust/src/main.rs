mod greetings;
mod lifetime;
mod traits;
mod concurrent;

use lifetime::{reference,borrow,ownership};
use traits::basic::{Hello, Student};
// use traits::polymorphism::{dynamic_dispatch};
// use concurrent;

use traits::error::{test as testError};
use traits::from::{from as testFrom};
// use std::io::{stdout, BufWriter};

fn main() {
    // let stdout = stdout();
    let message = String::from("Hello fellow Rustaceans!");
    let width = message.chars().count();
    println!("{}", width);

    greetings::hello();

    // lifetime
    reference::reference();

    // borrow
    ownership::ownership();

    //traits

    // let s = traits::basic::Student {};
    let s = Student {};
    s.say_hi();
    
    let result = testError();
    eprintln!("{:?}",result);

    testFrom();

    //concurrent
    concurrent::spawn::demo1();

    concurrent::spawn::demo2();

    concurrent::channel::demo1();
}
