trait Foo {
    fn method(&self) -> String;
}

impl Foo for u8 {
    fn method(&self) -> String {
        format!("u8: {}", *self)
    }
}

impl Foo for String {
    fn method(&self) -> String {
        format!("string: {}", *self)
    }
}

fn do_something<T: Foo>(x: T) {
    x.method();
}

pub fn static_dispatch() {
    let x = 5u8;
    let y = "Hello".to_string();

    do_something(x);
    do_something(y);
}

/*
// rust will generate above to below (code bloat)
fn do_something_u8(x: u8) {
    x.method();
}

fn do_something_string(x: String) {
    x.method();
}

fn main() {
    let x = 5u8;
    let y = "Hello".to_string();

    do_something_u8(x);
    do_something_string(y);
}
 */



fn do_something2(x: &Foo) {
    x.method();
}
/**
 * A trait object can be obtained from a pointer to a concrete type that implements the trait 
 * by casting it (e.g. &x as &Foo) 
 * or coercing it (e.g. using &x as an argument to a function that takes &Foo).
 */
pub fn dynamic_dispatch() {
    let x = "Hello".to_string();
    do_something2(&x);
}
