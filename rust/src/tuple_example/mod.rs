use std::fmt;

// 定义一个 2x2 矩阵结构体
struct Matrix {
    data: [[f64; 2]; 2],
}

impl Matrix {
    // 实现转置方法
    fn transpose(&self) -> Matrix {
        Matrix {
            data: [
                [self.data[0][0], self.data[1][0]],
                [self.data[0][1], self.data[1][1]],
            ],
        }
    }
}

// 实现自定义显示格式
impl fmt::Display for Matrix {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "( {:.1} {:.1} )\n( {:.1} {:.1} )",
            self.data[0][0], self.data[0][1], self.data[1][0], self.data[1][1]
        )
    }
}

pub fn tuple_example() {
    // 定义一个矩阵实例
    let matrix = Matrix {
        data: [[1.1, 1.2], [2.1, 2.2]],
    };

    // 打印原矩阵
    println!("Matrix:\n{}", matrix);

    // 打印转置矩阵
    println!("Transpose:\n{}", matrix.transpose());
}
