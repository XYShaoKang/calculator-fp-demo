import $ from 'jquery'
import * as _ from 'ramda'
import math from 'mathjs'

math.config({
  number: 'BigNumber',
})
export default class App {
  constructor(rootElement) {
    this.rootElement = rootElement
    this.display = $('<div id="display" ><p>1</p><p>2</p></div>')
    this.state = {
      opers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '+', '-', '*', '/', '=', 'AC'],
      data: [['0']],
      display: 0,
      history: [''],
    }
    this.init()
    this.render()
  }
  init() {
    const {
      createButton,
      rootElement,
      onclick,
      display,
      state: { opers },
    } = this
    const buttons = _.map(createButton)(opers)
    rootElement
      .append(display)
      .append($('<div id="operation"/>').append(buttons))
    rootElement.on('click', onclick)
  }
  onclick = e => {
    if (e.target.nodeName === 'BUTTON') {
      const { data, history } = this.state
      const value = $(e.target).html()
      if (!/AC|=/.test(value)) {
        this.state.data = fpSetData(value, data)
      } else if (/=/.test(value)) {
        const exp = data
          .map(a => (isOper(a[0]) ? a[0] : parseFloat(a.join(''))))
          .join('')
        history.push(exp + '=')
        const result = calculate(exp)
        if (result !== result) {
          this.state.data = [[`Error`]]
        } else {
          this.state.data = [[`${result}`]]
        }
      } else if (/AC/.test(value)) {
        this.allClean()
      }
      this.render()
    }
  }

  /**
   * 清零
   *
   * @memberof App
   */
  allClean() {
    this.state.data = [['0']]
    this.state.history = ['']
  }
  createButton(str) {
    return $(`<button>${str}</button>`)
  }

  render() {
    const display = _.compose(
      _.join(''),
      _.map(_.join('')),
    )(this.state.data)
    $(this.display.children()[0]).html(_.last(this.state.history))
    $(this.display.children()[1]).html(display)
  }
}
/**
 * 计算最终结构
 *
 * @memberof App
 */
function calculate(exp) {
  // let { data, history } = this.state
  // if (!isOper(_.last(data))) {
  //   history.push(exp + '=')
  //   this.state.data = [[`${math.number(math.eval(exp))}`]]
  // }
  return math.number(math.eval(exp))
}
function fpSetData(value, data) {
  const tempData = [...data]
  let arr = [...tempData.pop()]
  if (arr[0] === 'Error') {
    arr = ['0']
  }
  if (isOper(value)) {
    if (isOper(arr[0])) {
      arr[0] = value
      tempData.push(arr)
    } else {
      tempData.push(arr, [value])
    }
  } else if (isNum(value)) {
    if (isOper(arr[0])) {
      tempData.push(arr, [value])
    } else if (arr[0] === '0' && arr.length === 1) {
      arr[0] = value
      tempData.push(arr)
    } else {
      arr.push(value)
      tempData.push(arr)
    }
  } else if (isDot(value)) {
    if (isOper(arr[0])) {
      tempData.push(arr, ['0', value])
    } else if (!isDot(arr.join(''))) {
      arr.push(value)
      tempData.push(arr)
    }
  }
  return tempData
}
/**
 * 判断是否为运算符
 *
 * @param {*} value
 * @returns
 * @memberof App
 */
function isOper(value) {
  return /\+|\-|\*|\//.test(value)
}
function isNum(value) {
  return /\d/.test(value)
}
function isDot(value) {
  return /\./.test(value)
}
export { isOper, isNum, isDot, fpSetData, calculate }
