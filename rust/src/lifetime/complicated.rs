// 地球
#[derive(Debug)]
struct Earth {
  location: String,
}
// 恐龙
#[derive(Debug)]
struct Dinosaur<'a> {
  location: &'a Earth,
  name: String,
}

impl<'a> From<Dinosaur<'a>> for String {
  fn from(d: Dinosaur) -> String {
    format!("{:?}", d)
  }
}

pub fn test() {
  let new_york = Earth {
    location: "New York, NY".to_string(),
  };
  let t_rex = Dinosaur {
    location: &new_york,
    name: "T Rex".to_string(),
  };
  // println!("{:?}", t_rex);
  println!("{}", String::from(t_rex));
}