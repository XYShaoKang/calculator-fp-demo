import * as _ from 'ramda'
import { isOper, isDot, getLastFirst, updateItem } from './common'
import { pushOper } from './push-oper.js'
import { pushDot } from './push-dot.js'
import { pushNum } from './push-num.js'

// [[a]] -> Boolean
const lastIsError = _.pipe(
  getLastFirst,
  _.equals('Error'),
)

const getAddOper = () => pushOper
const getAddDot = () => _.flip(pushDot)
const getAddNum = () => pushNum

// TODO:完善分支判断
// a -> b
const getAddFn = _.ifElse(
  isOper,
  getAddOper,
  _.ifElse(isDot, getAddDot, getAddNum),
)
// [[a]] -> [[a]]
const replaceError = _.when(lastIsError, updateItem('0'))
// [[a]] -> [[a]]
const getNewData = _.flip(
  _.pipe(
    _.clone,
    replaceError,
  ),
)
// a -> [[a]] -> [[a]]
const pushValue = _.converge(_.call, [getAddFn, _.identity, getNewData])
export { pushValue }
