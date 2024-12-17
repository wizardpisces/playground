mod greetings;
mod lifetime;
mod traits;
mod concurrent;
mod tuple_example;
mod linked_list;
mod macro_example;
use lifetime::{reference,ownership};
use traits::basic::{Hello, Student};
// use traits::polymorphism::{dynamic_dispatch};
// use concurrent;

use traits::error::{test as testError};
use traits::from::{from as testFrom};
// use std::io::{stdout, BufWriter};

fn main() {
    // simple
    greetings::hello();

    /* lifetime */
    reference::reference();
    ownership::ownership();
    lifetime::borrow::borrow_move();

    /*traits*/

    let s = Student {};
    s.say_hi();
    
    let result = testError();
    eprintln!("{:?}",result);

    testFrom();

    /*concurrent*/
    concurrent::mutex::demo1();

    /*tuple*/
    tuple_example::tuple_example();

    /*linked_list*/
    linked_list::linked_list_example();

    /*macro*/
    macro_example::macro_example();
}
