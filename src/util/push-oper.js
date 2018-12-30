import * as _ from 'ramda'
import { lastIsOper, appendItem, updateItem } from './common'

// a -> [[a]] -> [[a]]
const pushOper = _.ifElse(_.flip(lastIsOper), updateItem, appendItem)

export { pushOper }
