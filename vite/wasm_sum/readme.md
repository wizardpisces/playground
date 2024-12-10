# 编译wasm
**first time**
```bash
cargo new wasm_sum --lib
cd wasm_sum
cargo install wasm-bindgen-cli

```

**after modify src/lib.rs**
```bash
cargo build --release --target wasm32-unknown-unknown
wasm-bindgen target/wasm32-unknown-unknown/release/wasm_sum.wasm --out-dir pkg --target web
```
