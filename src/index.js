import $ from 'jquery'
import * as _ from 'ramda'
import App from './app'
import './styles.less'

var $root = $('<div id="root" />')
$('body').prepend($root)

const app = new App($root)
