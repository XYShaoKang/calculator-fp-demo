import $ from 'jquery'
import * as _ from 'ramda'
import { pushValue, calculate, flattenJoin } from './util'

export default class App {
  constructor(rootElement) {
    this.rootElement = rootElement
    this.displayElement = $('<div id="display" ><p>1</p><p>2</p></div>')
    this.state = {
      // ???????
      opers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '+', '-', '*', '/', '=', 'AC'],
      // ?????????
      data: [['0']],
      // ????
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
      displayElement,
      state: { opers },
    } = this
    const buttons = _.map(createButton)(opers)

    rootElement
      .append(displayElement)
      .append($('<div id="operation"/>').append(buttons))
    rootElement.on('click', onclick)
  }
  createButton(str) {
    return $(`<button>${str}</button>`)
  }
  onclick = e => {
    if (e.target.nodeName === 'BUTTON') {
      // ??????
      const { state, allClean, render } = this
      const { data, history } = state
      const value = $(e.target).html()

      if (!/AC|=/.test(value)) {
        // ?? ? ???
        this.state.data = pushValue(value, data)
      } else if (/=/.test(value)) {
        // ??
        const exp = flattenJoin('')(data)
        history.push(exp + '=')

        const result = calculate(exp)
        if (result !== result) {
          // NaN
          state.data = [[`Error`]]
        } else {
          state.data = [[`${result}`]]
        }
      } else if (/AC/.test(value)) {
        // ??
        allClean()
      }
      render()
    }
  }
  allClean = () => {
    this.state.data = [['0']]
    this.state.history = ['']
  }
  render = () => {
    const {
      displayElement,
      state: { data, history },
    } = this
    const displayText = flattenJoin('')(data)
    $(displayElement.children()[0]).html(_.last(history))
    $(displayElement.children()[1]).html(displayText)
  }
}
