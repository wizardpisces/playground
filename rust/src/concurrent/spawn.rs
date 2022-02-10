use std::thread;
use std::time::Duration;

pub fn demo1() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
    // handle是拥有所有权的值，当对其调用 join 方法时，它会等待其线程结束
    handle.join().unwrap();
    demo2()
}

fn demo2() {
    let v = vec![1, 2, 3];

    // 所有权move到新的线程
    let handle = thread::spawn(move ||{
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}