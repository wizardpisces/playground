use wasm_bindgen::prelude::*;

// 让 WebAssembly 模块可以导出这个函数
#[wasm_bindgen]
pub fn sum(a: i32, b: i32, c: Option<i32>) -> i32 {
    a + b + c.unwrap_or(0) // 如果 c 是 None，则使用默认值 0
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = sum(2, 2, Some(2));
        assert_eq!(result, 6);
    }
}
