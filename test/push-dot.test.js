import {
  pushDot,
  hasDot,
  lastIfNotHasDot,
  updateLastUseDotConcat,
  addZeroDotToLast,
} from '../src/util/push-dot'

describe('test pushDot', () => {
  it('Add a dot to the initial data', () => {
    const initData = [['0']]
    const result = pushDot(initData)
    expect(JSON.stringify(result)).toBe(JSON.stringify([['0', '.']]))
  })
  it(`Add a dot to [['1', '2', '3']]`, () => {
    const initData = [['1', '2', '3']]
    const result = pushDot(initData)
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1', '2', '3', '.']]))
  })
  it(`Add a dot to [['1'], ['+']]`, () => {
    const initData = [['1'], ['+']]
    const result = pushDot(initData)
    expect(JSON.stringify(result)).toBe(
      JSON.stringify([['1'], ['+'], ['0', '.']]),
    )
  })
  it(`Add a dot to [['1'], ['+'], ['2', '.', '3']]`, () => {
    const initData = [['1'], ['+'], ['2', '.', '3']]
    const result = pushDot(initData)
    expect(JSON.stringify(result)).toBe(
      JSON.stringify([['1'], ['+'], ['2', '.', '3']]),
    )
  })
})

describe('test hasDot', () => {
  it(`Returns false when a [['0']] is passed in`, () => {
    const result = hasDot([['0']])
    expect(result).toBe(false)
  })
  it(`Returns false when a [['+']] is passed in`, () => {
    const result = hasDot([['+']])
    expect(result).toBe(false)
  })
  it(`Returns true when a [['0', '.', '1']] is passed in`, () => {
    const result = hasDot([['0', '.', '1']])
    expect(result).toBe(true)
  })
})
describe('test lastIfNotHasDot', () => {
  it(`Returns true when a [['0']] is passed in`, () => {
    const result = lastIfNotHasDot([['0']])
    expect(result).toBe(true)
  })
  it(`Returns false when a [['0', '.', '1']] is passed in`, () => {
    const result = lastIfNotHasDot([['0', '.', '1']])
    expect(result).toBe(false)
  })
})
describe('test updateLastUseDotConcat', () => {
  it(`Returns [['0', '.']] when a [['0']] is passed in`, () => {
    const result = updateLastUseDotConcat([['0']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['0', '.']]))
  })
  it(`Returns [['1', '2', '1', '.']] when a [['0', '.', '1']] is passed in`, () => {
    const result = updateLastUseDotConcat([['1', '2', '1']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1', '2', '1', '.']]))
  })
  it(`Returns [['1'], ['+'], ['1', '2', '1', '.']] when a [['0', '.', '1']] is passed in`, () => {
    const result = updateLastUseDotConcat([['1'], ['+'], ['1', '2', '1']])
    expect(JSON.stringify(result)).toBe(
      JSON.stringify([['1'], ['+'], ['1', '2', '1', '.']]),
    )
  })
})
describe('test addZeroDotToLast', () => {
  it(`Returns [['-'], ['0', '.']] when a [['-']] is passed in`, () => {
    const result = addZeroDotToLast([['-']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['-'], ['0', '.']]))
  })
})
