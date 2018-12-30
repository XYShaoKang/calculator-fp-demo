import { pushOper } from '../src/util/push-oper'

describe('test pushOper', () => {
  it(`Returns [['0'], ['+']] when a '+' and a [['0']] is passed in`, () => {
    const result = pushOper('+', [['0']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['0'], ['+']]))
  })
  it(`Returns [['0'], ['+']] when a '+' and a [['0'], ['-']] is passed in`, () => {
    const result = pushOper('+', [['0'], ['-']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['0'], ['+']]))
  })
})
