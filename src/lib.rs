#![deny(clippy::all)]

use napi::bindgen_prelude::Buffer;
use napi_derive::napi;

#[napi(constructor)]
pub struct EmptyClass {}

#[napi]
pub fn get_buffer() -> Buffer {
  vec![1u8; 32].into()
}

#[napi]
pub fn plus_100(input: u32) -> u32 {
  input + 100
}
