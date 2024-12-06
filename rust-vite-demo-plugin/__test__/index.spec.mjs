import test from 'ava'

import { sum, transformCode } from '../index.js'

test('sum from native', (t) => {
  t.is(sum(1, 2), 3)
})


test('transformCode from native', (t) => {
  t.is(transformCode('console.log("hello")'), 'console.debug("hello")')
})
