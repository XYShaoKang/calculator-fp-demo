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

const lastFirst = _.compose(
  _.prop(0),
  _.last,
)
const concatDot = _.compose(
  isDot,
  _.join(''),
)
const lastIsOper = _.flip(
  _.pipe(
    lastFirst,
    isOper,
  ),
)
const updataLast = _.pipe(
  _.of,
  _.update(-1),
)
const concatNewLast = (oper, data) => data.concat([[oper]])

const addOper = _.ifElse(lastIsOper, updataLast, concatNewLast)

const addDot = data => {
  if (isOper(lastFirst(data))) {
    return data.concat([['0', '.']])
  } else if (!concatDot(_.last(data))) {
    return _.update(-1, _.last(data).concat('.'), data)
  }
}
function addNum(value, data) {
  if (isOper(lastFirst(data))) {
    return data.concat([value])
  } else {
    const last = _.pipe(
      _.join(''),
      parseFloat,
      _.toString,
      _.split(''),
    )(_.last(data).concat(value))
    return _.update(-1, last, data)
  }
}

function fpSetData(value, data) {
  const tempData = [...data.map(a => [...a])]
  let arr = _.last(tempData)
  if (arr[0] === 'Error') {
    arr[0] = '0'
  }

  if (isOper(value)) {
    return addOper(value, tempData)
  }
  if (isDot(value)) {
    return addDot(tempData)
  }
  if (isNum(value)) {
    return addNum(value, tempData)
  }
}

export { isOper, isNum, isDot, fpSetData, calculate }
