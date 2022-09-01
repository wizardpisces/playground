## Introduction

try to replace ts-loader with esbuild-loader

## How To Run

```
pnpm i
npm run build
```

## Result

build result is the same, with difference: ts-loader will try to build files not in dependency graph (build error in other.ts is the indication)