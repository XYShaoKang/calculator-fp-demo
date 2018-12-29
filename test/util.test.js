import { isDot, isNum, isOper, fpSetData, calculate } from '../src/util'

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
describe.only('test fpSetData', () => {
  it('Add a number to the initial data', () => {
    const initData = createFreeData([['0']])
    const result = fpSetData('1', initData)
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1']]))
  })
  it('Add a dot to the initial data', () => {
    const initData = createFreeData([['0']])
    const result = fpSetData('.', initData)
    expect(JSON.stringify(result)).toBe(JSON.stringify([['0', '.']]))
  })
  it('Add a operator to the initial data', () => {
    const initData = createFreeData([['0']])
    const result = fpSetData('+', initData)
    expect(JSON.stringify(result)).toBe(JSON.stringify([['0'], ['+']]))
  })
  it(`Add '1,-,3' to the initial data`, () => {
    const initData = createFreeData([['0']])
    const addDatas = ['1', '-', '3']
    const result = addDatas.reduce((a, b) => {
      a = createFreeData(fpSetData(b, a))
      return a
    }, initData)
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1'], ['-'], ['3']]))
  })
  it(`Add '1,3,-,3,2' to the initial data`, () => {
    const initData = createFreeData([['0']])
    const addDatas = ['1', '3', '-', '3', '2']
    const result = addDatas.reduce((a, b) => {
      a = createFreeData(fpSetData(b, a))
      return a
    }, initData)
    expect(JSON.stringify(result)).toBe(
      JSON.stringify([['1', '3'], ['-'], ['3', '2']]),
    )
  })
  it(`Add '1,3,-,.,+,3,2' to the initial data`, () => {
    const initData = createFreeData([['0']])
    const addDatas = ['1', '3', '-', '.', '+', '3', '2']
    const result = addDatas.reduce((a, b) => {
      a = createFreeData(fpSetData(b, a))
      return a
    }, initData)
    expect(JSON.stringify(result)).toBe(
      JSON.stringify([['1', '3'], ['-'], ['0', '.'], ['+'], ['3', '2']]),
    )
  })
  it(`Add '1' to the [['Error']]`, async () => {
    const initData = createFreeData([['Error']])
    const addDatas = ['1']
    const result = addDatas.reduce((a, b) => {
      a = createFreeData(fpSetData(b, a))
      return a
    }, initData)
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1']]))
  })
})

describe('test calculate', () => {
  it('Calculate 1 + 1 and return 2', () => {
    const result = calculate('1+1')
    expect(result).toBe(2)
  })
  it('Calculate 1 + 2 * 8 + 2 and return 19', () => {
    const result = calculate('1 + 2 * 8 + 2')
    expect(result).toBe(19)
  })
  it('Calculate 2.1 + 2.2 and return 4.3', () => {
    const result = calculate('2.1 + 2.2')
    expect(result).toBe(4.3)
  })
  it('Calculate 1 / 0 and return 4.3', () => {
    const result = calculate('1 / 0')
    expect(result).toBe(Infinity)
  })
})

function createFreeData(data) {
  if (
    data !== null &&
    data.constructor() instanceof Object &&
    Object.isFrozen(data)
  ) {
    Object.keys(data).map(key => (data[key] = createFreeData(data[key])))
    return Object.freeze(data)
  } else {
    return data
  }
}
