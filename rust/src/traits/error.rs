use std::fs::File;
use std::io;

#[derive(Debug)]
pub struct AppError {
    kind: String,    // type of the error
    message: String, // error message
}

// Implement std::convert::From for AppError; from io::Error
impl From<io::Error> for AppError {
    fn from(error: io::Error) -> Self {
        AppError {
            kind: String::from("io"),
            message: error.to_string(),
        }
    }
}

pub fn test() -> Result<(), AppError> {
    let _file = File::open("nonexistent_file.txt")?; // This generates an io::Error. But because of return type is Result<(), AppError>, it converts to AppError

    Ok(())
}
