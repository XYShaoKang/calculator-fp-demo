import { pushNum, updateItemConcat } from '../src/util/push-num'

describe('test pushNum', () => {
  it(`Returns [['1']] when a '1' and a [['0']] is passed in`, () => {
    const result = pushNum('1', [['0']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1']]))
  })
  it(`Returns [['1','1']] when a '1' and a [['1']] is passed in`, () => {
    const result = pushNum('1', [['1']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1', '1']]))
  })
  it(`Returns [['1'], ['+'], ['1']] when a '1' and a [['1'], ['+']] is passed in`, () => {
    const result = pushNum('1', [['1'], ['+']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1'], ['+'], ['1']]))
  })
  it(`Returns [['1'], ['+'], ['1', '1']] when a '1' and a [['1'], ['+'], ['1']] is passed in`, () => {
    const result = pushNum('1', [['1'], ['+'], ['1']])
    expect(JSON.stringify(result)).toBe(
      JSON.stringify([['1'], ['+'], ['1', '1']]),
    )
  })
})
describe('test updateItemConcat', () => {
  it(`Returns [['1']] when a '1' and a [['0']] is passed in`, () => {
    const result = updateItemConcat('1', [['0']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1']]))
  })
  it(`Returns [['1','1']] when a '1' and a [['1']] is passed in`, () => {
    const result = updateItemConcat('1', [['1']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1', '1']]))
  })
  it(`Returns [['1'], ['+'], ['1', '1']] when a '1' and a [['1'], ['+'], ['1']] is passed in`, () => {
    const result = updateItemConcat('1', [['1'], ['+'], ['1']])
    expect(JSON.stringify(result)).toBe(
      JSON.stringify([['1'], ['+'], ['1', '1']]),
    )
  })
})
