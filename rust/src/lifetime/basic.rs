pub fn test() {
    let money: String = "42".to_string();
    fn borrow_it(qty: &String) {
      println!("Your money total is ${}", qty)
    }
    borrow_it(&money); // borrowed ownership
    // the ownership of money has been returned to this higher scope
    fn consume_it(qty: String) {
      println!("My money total is ${}", qty)
    }
    consume_it(money);
    // money memory is freed as the ownership has been
    // taken into the methods scope and that scope has ended.
    println!("No money: ${}", money);
    // This fails
}

// 代码需要改为 i32 的类型（有实现 Copy Trait）