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
      const value = $(e.target).html()
      if (!/AC|=/.test(value)) {
        this.setData(value)
      } else if (/=/.test(value)) {
        this.calculate()
      } else if (/AC/.test(value)) {
        this.allClean()
      }
      this.render()
    }
  }
  setData(value) {
    let { data } = this.state
    const { isOper } = this
    let arr = _.last(data)
    if (isOper(value)) {
      if (isOper(arr[0])) {
        arr[0] = value
      } else {
        data.push([value])
      }
    } else if (/\d/.test(value)) {
      if (isOper(arr[0])) {
        data.push([value])
      } else if (arr[0] === '0' && arr.length === 1) {
        arr[0] = value
      } else {
        arr.push(value)
      }
    } else {
      if (isOper(arr[0])) {
        data.push([value])
      } else if (!/\./.test(arr.join(''))) {
        arr.push(value)
      }
    }
  }
  calculate() {
    let { data, history } = this.state
    const { isOper } = this
    if (!isOper(_.last(data))) {
      const exp = data
        .map(a => (isOper(a[0]) ? a[0] : parseFloat(a.join(''))))
        .join('')
      history.push(exp + '=')
      this.state.data = [[`${math.number(math.eval(exp))}`]]
    }
  }
  allClean() {
    this.state.data = [['0']]
    this.state.history = ['']
  }
  createButton(str) {
    return $(`<button>${str}</button>`)
  }
  isOper(value) {
    return /\+|\-|\*|\//.test(value)
  }
  render() {
    const display = _.compose(
      _.join(''),
      _.map(_.join('')),
    )(this.state.data)
    console.log(this.display.children()[0])
    $(this.display.children()[0]).html(_.last(this.state.history))
    $(this.display.children()[1]).html(display)
  }
}
