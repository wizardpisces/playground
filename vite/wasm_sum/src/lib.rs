use wasm_bindgen::prelude::*;

// 让 WebAssembly 模块可以导出这个函数
#[wasm_bindgen]
pub fn sum(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = sum(2, 2);
        assert_eq!(result, 4);
    }
}
