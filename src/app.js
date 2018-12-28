import $ from 'jquery'
import * as _ from 'ramda'
import { isOper, fpSetData, calculate } from './util'

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
        const exp = _.flatten(data).join('')
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
