import {
  isOper,
  isNum,
  isDot,
  getLastFirst,
  lastIsOper,
  flipConcat,
  appendItem,
  updateItem,
} from '../src/util/common'
describe('test isDot', () => {
  it('Returns true when a dot is passed in', () => {
    expect(isDot('.')).toBe(true)
  })
  it('Returns false when a number is passed in', () => {
    expect(isDot('0')).toBe(false)
    expect(isDot('5')).toBe(false)
    expect(isDot('8')).toBe(false)
  })
  it('Returns false when a operator is passed in', () => {
    expect(isDot('+')).toBe(false)
    expect(isDot('-')).toBe(false)
    expect(isDot('*')).toBe(false)
    expect(isDot('/')).toBe(false)
  })
})
describe('test isNum', () => {
  it('Returns true when a number is passed in', () => {
    expect(isNum('0')).toBe(true)
    expect(isNum('3')).toBe(true)
    expect(isNum('6')).toBe(true)
  })
  it('Returns false when a dot is passed in', () => {
    expect(isNum('.')).toBe(false)
  })
  it('Returns false when a operator is passed in', () => {
    expect(isNum('+')).toBe(false)
    expect(isNum('-')).toBe(false)
    expect(isNum('*')).toBe(false)
    expect(isNum('/')).toBe(false)
  })
})
describe('test isOper', () => {
  it('Returns true when a operator is passed in', () => {
    expect(isOper('+')).toBe(true)
    expect(isOper('-')).toBe(true)
    expect(isOper('*')).toBe(true)
    expect(isOper('/')).toBe(true)
  })
  it('Returns false when a number is passed in', () => {
    expect(isOper('0')).toBe(false)
    expect(isOper('3')).toBe(false)
    expect(isOper('6')).toBe(false)
  })
  it('Returns false when a dot is passed in', () => {
    expect(isOper('.')).toBe(false)
  })
})
describe('test getLastFirst', () => {
  it(`Returns '0' when [['0']] is passend in`, () => {
    const result = getLastFirst([['0']])
    expect(result).toBe('0')
  })
  it(`Returns '+' when [['0'],['+']] is passend in`, () => {
    const result = getLastFirst([['0'], ['+']])
    expect(result).toBe('+')
  })
  it(`Returns '1' when [['0'], ['+'], ['1', '2', '3']] is passend in`, () => {
    const result = getLastFirst([['0'], ['+'], ['1', '2', '3']])
    expect(result).toBe('1')
  })
})
describe('test lastIsOper', () => {
  it(`Returns false when [['0']] is passend in`, () => {
    const result = lastIsOper([['0']])
    expect(result).toBe(false)
  })
  it(`Returns true when [['0'],['+']] is passend in`, () => {
    const result = lastIsOper([['0'], ['+']])
    expect(result).toBe(true)
  })
  it(`Returns false when [['0'], ['+'], ['1', '2', '3']] is passend in`, () => {
    const result = lastIsOper([['0'], ['+'], ['1', '2', '3']])
    expect(result).toBe(false)
  })
})

describe('test flipConcat', () => {
  it(`Returns [['0'],['+']] when ([['+']], [['0']]) is passend in`, () => {
    const result = flipConcat([['+']], [['0']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['0'], ['+']]))
  })
})
describe('test appendItem', () => {
  it(`Returns [['0'],['+']] when ('+', [['0']]) is passend in`, () => {
    const result = appendItem('+', [['0']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['0'], ['+']]))
  })
})
describe('test updateItem', () => {
  it(`Returns [['1']] when ('1', [['0']]) is passend in`, () => {
    const result = updateItem('1', [['0']])
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1']]))
  })
})
