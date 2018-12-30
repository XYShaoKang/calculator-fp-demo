import * as _ from 'ramda'
import { lastIsOper, flipConcat, appendItem } from './common'

// a -> [[a]] -> [[a]]
const updateItemConcat = _.converge(_.update(-1), [
  _.pipe(
    _.useWith(flipConcat, [_.of, _.last]),
    _.join(''),
    parseFloat,
    _.toString,
    _.split(''),
  ),
  _.flip(_.identity),
])
// a -> [[a]] -> [[a]]
const pushNum = _.ifElse(_.flip(lastIsOper), appendItem, updateItemConcat)
export { pushNum, updateItemConcat }
