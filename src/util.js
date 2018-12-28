import math from 'mathjs'
import * as _ from 'ramda'

math.config({
  number: 'BigNumber',
})

const isOper = _.test(/\+|\-|\*|\//)
const isNum = _.test(/\d/)
const isDot = _.test(/\./)
const calculate = _.compose(
  math.number,
  math.eval,
)

function fpSetData(value, data) {
  const tempData = [...data]
  let arr = [...tempData.pop()]
  if (arr[0] === 'Error') {
    arr = ['0']
  }

  const lastIsZero = arr.join('') === '0'
  const lastIsOper = isOper(arr[0])
  const lastConcatDot = isDot(arr.join(''))
  const valueIsNum = isNum(value)
  const valueIsOper = isOper(value)
  const valueIsDot = isDot(value)

  // 当传入数字并且最后以为不是运算符
  if ((valueIsNum && lastIsZero) || (valueIsOper && lastIsOper)) {
    arr = [value]
  }

  if (
    !lastIsOper &&
    ((valueIsNum && !lastIsZero) || (valueIsDot && !lastConcatDot))
  ) {
    arr = arr.concat(value)
  }

  tempData.push(arr)

  // 当传入点冰球最后一位是运算符
  if (valueIsDot && lastIsOper) {
    tempData.push(['0', value])
  }

  // 当传入运算符并且最后一位不是运算符,或者传入数字并且最后以为是运算符
  if ((valueIsOper && !lastIsOper) || (valueIsNum && lastIsOper)) {
    tempData.push([value])
  }

  return tempData
}

export { isOper, isNum, isDot, fpSetData, calculate }
