import '../scss/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import MainLayout from './MainLayout'
import Home from './Home'

render((
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('app'))
