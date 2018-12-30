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

const getPushOper = () => pushOper
const getPushDot = () => _.flip(pushDot)
const gePushNum = () => pushNum

// a -> b
const getPushFn = _.ifElse(
  isOper,
  getPushOper,
  _.ifElse(isDot, getPushDot, gePushNum),
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
const pushValue = _.converge(_.call, [getPushFn, _.identity, getNewData])
export { pushValue }
