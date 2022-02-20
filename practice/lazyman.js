new LazyMan("food").eat("eat1").sleep(1000).eat("eat2").sleepFirst(3000);






























class LazyMan {
  constructor(food) {
    console.log(food);
    this.taskList = [];
    setTimeout(() => this.next(), 0);
  }
  next() {
    let task = this.taskList.shift();
    task && task();
  }
  eat(food) {
    this.taskList.push(() => {
      console.log(food);
      this.next();
    });
    return this;
  }
  sleep(time) {
    this.taskList.push(this.asyncTaskGenerator(time));
    return this;
  }
  sleepFirst(time) {
    this.taskList.unshift(this.asyncTaskGenerator(time));
    return this;
  }
  asyncTaskGenerator(time) {
    return () => {
      setTimeout(() => this.next(), time);
    };
  }
}
