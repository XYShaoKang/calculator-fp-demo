import {
  isOper,
  isNum,
  isDot,
  getLastFirst,
  lastIsOper,
  flipConcat,
  appendItem,
  updateItem,
  flattenJoin,
} from './common'
import { pushOper } from './push-oper.js'
import { pushDot } from './push-dot.js'
import { pushNum } from './push-num.js'
import { calculate } from './calculate'
import { pushValue } from './push-value-to-data'

export {
  isOper,
  isNum,
  isDot,
  getLastFirst,
  lastIsOper,
  flipConcat,
  appendItem,
  updateItem,
  pushOper,
  pushDot,
  pushNum,
  calculate,
  pushValue,
  flattenJoin,
}
