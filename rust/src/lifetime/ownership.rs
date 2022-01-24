
pub fn ownership() {
    let money: i32 = 42;
    fn borrow_it(qty: &i32) {
      println!("Your money total is ${}", qty)
    }
    borrow_it(&money); // borrowed ownership
    // the ownership of money has been returned to this higher scope
    fn consume_it(qty: i32) {
      println!("My money total is ${}", qty)
    }
    consume_it(money);// i32 赋值自动是 Copy类型，所以 money的lifetime还在
    // assign is 
    println!("No money: ${}", money);

    // This fails
}

