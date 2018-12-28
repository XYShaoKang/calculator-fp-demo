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

  // 当传入运算符并且最后一位不是运算符,或者传入数字并且最后以为是运算符
  if ((isOper(value) && !isOper(arr[0])) || (isNum(value) && isOper(arr[0]))) {
    tempData.push(arr, [value])
  }

  // 当传入数字并且最后以为不是运算符
  if (isNum(value) && !isOper(arr[0])) {
    tempData.push(`${parseFloat(arr.concat(value).join(''))}`.split(''))
  }

  // 当传入运算符并且最后一位是运算符
  if (isOper(value) && isOper(arr[0])) {
    tempData.push([value])
  }

  // 当传入点冰球最后一位是运算符
  if (isDot(value) && isOper(arr[0])) {
    tempData.push(arr, ['0', value])
  }

  // 当传入点,并且最后一位中不包含点
  if (isDot(value) && !isDot(arr.join(''))) {
    tempData.push(arr.concat(value))
  }

  return tempData
}

export { isOper, isNum, isDot, fpSetData, calculate }
