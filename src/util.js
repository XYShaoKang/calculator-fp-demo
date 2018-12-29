import math from 'mathjs'
import * as _ from 'ramda'

math.config({
  number: 'BigNumber',
})

const log = (...arg) => {
  console.log(arg)
  return arg[0]
}
// String -> Boolean
const isOper = _.test(/\+|\-|\*|\//)
// String -> Boolean
const isNum = _.test(/\d/)
// String -> Boolean
const isDot = _.test(/\./)
// String -> Number
const calculate = _.pipe(
  math.eval,
  math.number,
)
// [[a]] -> a | Undefined
const getLastFirst = _.pipe(
  _.last,
  _.prop(0),
)
// [a] -> true
const hasDot = _.pipe(
  _.join(''),
  isDot,
)
// [[a]] -> true
const lastIsOper = _.pipe(
  getLastFirst,
  isOper,
)
// [a] -> [a] -> [a]
const flipConcat = _.flip(_.concat)
// a -> [[a]]
const twoOf = _.pipe(
  _.of,
  _.of,
)
// a -> [[a]] -> [[a]]
const concatLast = _.useWith(flipConcat, [twoOf, _.identity])
// [a] -> [a]
const addZeroDotToLast = flipConcat([['0', '.']])
// [a] -> [a]
const updateLastUseDotConcat = _.converge(_.update(-1), [
  _.pipe(
    _.last,
    flipConcat(['.']),
  ),
  _.identity,
])
// [[a]] -> Boolean
const lastIfNotHasDot = _.pipe(
  _.last,
  hasDot,
  _.not,
)
// (a,[[a]]) -> [[a]]
const addItemToLast = _.useWith(flipConcat, [
  _.pipe(
    _.of,
    _.of,
  ),
  _.identity,
])
// a -> [[a]] -> [[a]]
const updateLast = _.useWith(_.update(-1), [
  _.pipe(
    _.of,
    _.of,
  ),
  _.identity,
])
// a -> [[a]] -> [[a]]
const updateLastUseValue = _.converge(_.update(-1), [
  _.pipe(
    _.useWith(flipConcat, [_.of, _.last]),
    _.join(''),
    parseFloat,
    _.toString,
    _.split(''),
  ),
  _.flip(_.identity),
])
// [[a]] -> Boolean
const lastIsError = _.pipe(
  getLastFirst,
  _.equals('Error'),
)

// a -> [[a]] -> [[a]]
const addOper = _.ifElse(_.flip(lastIsOper), updateLast, concatLast)
// a -> [[a]] -> [[a]]
const addDot = _.ifElse(
  lastIsOper,
  addZeroDotToLast,
  _.when(lastIfNotHasDot, updateLastUseDotConcat),
)
// a -> [[a]] -> [[a]]
const addNum = _.ifElse(_.flip(lastIsOper), addItemToLast, updateLastUseValue)

// (a,[[a]]) -> [[a]]
function fpSetData1(value, data) {
  var tempData = _.pipe(
    _.clone,
    _.when(lastIsError, updateLast('0')),
  )(data)

  if (isOper(value)) {
    return addOper(value, tempData)
  }
  if (isDot(value)) {
    return addDot(tempData)
  }
  if (isNum(value)) {
    console.log(value, data)
    return addNum(value, tempData)
  }
}

const getAddOper = () => addOper
const getAddDot = () => _.flip(addDot)
const getAddNum = () => addNum

// TODO:完善分支判断
// a -> b
const getAddFn = _.ifElse(
  isOper,
  getAddOper,
  _.ifElse(isDot, getAddDot, getAddNum),
)
// [[a]] -> [[a]]
const replaceError = _.when(lastIsError, updateLast('0'))
// [[a]] -> [[a]]
const getNewData = _.flip(
  _.pipe(
    _.clone,
    replaceError,
  ),
)
// (a,[[a]]) -> [[a]]
const fpSetData = _.converge(_.call, [getAddFn, _.identity, getNewData])

export { isOper, isNum, isDot, fpSetData, calculate }
