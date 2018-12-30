import math from 'mathjs'
import * as _ from 'ramda'

math.config({
  number: 'BigNumber',
})

// String -> Number
const calculate = _.pipe(
  math.eval,
  math.number,
)

export { calculate }
