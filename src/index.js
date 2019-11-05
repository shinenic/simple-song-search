import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import { BrowserRouter, Switch} from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.register();
