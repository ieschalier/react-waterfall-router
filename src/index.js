import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from './store'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
