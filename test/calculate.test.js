import { calculate } from '../src/util/calculate'

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
