// 惰性 proxy

let proxyMap = new WeakMap()

function reactive(obj) {
  let existP = proxyMap.get(obj)
  if (existP) return existP; 
  let p = new Proxy(obj, {
    set(target, key, value) {
      console.log("old:", target[key], "new:", value);
      Reflect.set(target, key, value);
    },
    get(target, key, value) {
      if (typeof target[key] === "object") {
        console.log('key',key)
        return reactive(target[key]);
      }
      return value;
    },
  });
  proxyMap.set(obj,p)
  return p;
}

let data = reactive({
  a: {
    b: 1,
  },
});

data.a.b = 2;

console.log(data.a.b);
