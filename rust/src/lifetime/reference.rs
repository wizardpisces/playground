// 地球
#[derive(Debug)]
struct Earth {
  location: String,
}
// 恐龙
#[derive(Debug)]
struct Dinosaur {
  location: Earth,
  name: String,
}

impl From<Dinosaur> for String {
  fn from(d: Dinosaur) -> String {
    format!("{:?}", d)
  }
}

pub fn reference() {
  let new_york = Earth {
    location: "New York, NY".to_string(),
  };
  let t_rex = Dinosaur {
    location: new_york,
    name: "T Rex".to_string(),
  };
  // println!("{:?}", new_york);
  println!("{}", String::from(t_rex));
}