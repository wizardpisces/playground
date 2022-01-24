pub fn borrow_move() {
    let money: String = "42".to_string();
    fn borrow_it(qty: &String) {
      println!("Your money total is ${}", qty)
    }
    borrow_it(&money); // borrowed ownership
    // the ownership of money has been returned to this higher scope
    fn consume_it(qty: String) {
      println!("My money total is ${}", qty)
    }
    consume_it(money); // String 赋值是 Move类型，会导致lifetime也被转移，所以后面再也访问不到 Money了
    // money memory is freed as the ownership has been
    // taken into the methods scope and that scope has ended.
    // println!("No money: ${}", money);

    // This fails
}

fn get_first_element(a: &Vec<i32>) -> i32 {
    a[0]
}
fn shared_borrowing(){
    let a = vec![1, 2, 3];
    let b = get_first_element(&a);

    println!("{:?} {}", a, b); // [1, 2, 3] 1
}

fn mutable_borrowing(){
    let mut a = vec![1, 2, 3];
    let b = change_and_get_first_element(&mut a);

    println!("{:?} {}", a, b); // [4, 2, 3] 4
}

fn change_and_get_first_element(a: &mut Vec<i32>) -> i32 {
    a[0] = 4;
    a[0]
}
