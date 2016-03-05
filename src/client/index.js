import '../scss/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import MainLayout from './MainLayout'
import Home from './Home'

render((
  <Router history={browserHistory}>
    <Router path="/" component={MainLayout}>
      <IndexRoute component={Home} />
    </Router>
  </Router>
), document.getElementById('app'))
