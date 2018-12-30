import { pushValue } from '../src/util/push-value-to-data'

describe('test pushValue', () => {
  it(`Add '1,-,3' to the initial data`, () => {
    const initData = createFreeData([['0']])
    const addDatas = ['1', '-', '3']
    const result = addDatas.reduce((a, b) => {
      a = createFreeData(pushValue(b, a))
      return a
    }, initData)
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1'], ['-'], ['3']]))
  })
  it(`Add '1,3,-,3,2' to the initial data`, () => {
    const initData = createFreeData([['0']])
    const addDatas = ['1', '3', '-', '3', '2']
    const result = addDatas.reduce((a, b) => {
      a = createFreeData(pushValue(b, a))
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
      a = createFreeData(pushValue(b, a))
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
      a = createFreeData(pushValue(b, a))
      return a
    }, initData)
    expect(JSON.stringify(result)).toBe(JSON.stringify([['1']]))
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
