import * as _ from 'ramda'
import { isDot, lastIsOper, flipConcat } from './common'

// [a] -> true
const hasDot = _.pipe(
  _.join(''),
  isDot,
)
// [[a]] -> Boolean
const lastIfNotHasDot = _.pipe(
  _.last,
  hasDot,
  _.not,
)
// [a] -> [a]
const updateLastUseDotConcat = _.converge(_.update(-1), [
  _.pipe(
    _.last,
    flipConcat(['.']),
  ),
  _.identity,
])
// [a] -> [a]
const addZeroDotToLast = flipConcat([['0', '.']])
// [[a]] -> [[a]]
const pushDot = _.ifElse(
  lastIsOper,
  addZeroDotToLast,
  _.when(lastIfNotHasDot, updateLastUseDotConcat),
)

export {
  pushDot,
  hasDot,
  lastIfNotHasDot,
  updateLastUseDotConcat,
  addZeroDotToLast,
}
