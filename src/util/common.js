import * as _ from 'ramda'

// String -> ([[a]] -> String)
const flattenJoin = str =>
  _.pipe(
    _.flatten,
    _.join(str),
  )
// String -> Boolean
const isOper = _.test(/\+|\-|\*|\//)
// String -> Boolean
const isNum = _.test(/\d/)
// String -> Boolean
const isDot = _.test(/\./)
// [[a]] -> a | Undefined
const getLastFirst = _.pipe(
  _.last,
  _.prop(0),
)
// [[a]] -> true
const lastIsOper = _.pipe(
  getLastFirst,
  isOper,
)
// [a] -> [a] -> [a]
const flipConcat = _.flip(_.concat)

// a -> [[a]] -> [[a]]
const appendItem = _.useWith(flipConcat, [
  _.pipe(
    _.of,
    _.of,
  ),
  _.identity,
])
// a -> [[a]] -> [[a]]
const updateItem = _.useWith(_.update(-1), [_.of, _.identity])

export {
  isOper,
  isNum,
  isDot,
  getLastFirst,
  lastIsOper,
  flipConcat,
  appendItem,
  updateItem,
  flattenJoin,
}
