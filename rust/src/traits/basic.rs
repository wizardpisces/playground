pub trait Hello {
    fn say_hi(&self) {
        println!("hi");
    }
}
pub struct Student {}
impl Hello for Student {
    fn say_hi(&self) {
        println!("hi, I'm Jack.");
    }
}

pub struct Teacher {}
impl Hello for Teacher {}
