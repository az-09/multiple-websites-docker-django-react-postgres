import React from 'react'
import { HashRouter, Redirect, Switch } from 'react-router-dom'
import RenderRoute from './components/RenderRoute'
import routes from './components/routes'
import { Provider } from './contexts/Provider'
import './App.css'
import Layout from './components/Layout'

const App = () => {
  return (
    <div className="flex-container">
      <Provider>
        <HashRouter>
          <Layout>
            <Switch>
              {routes.map(route => <RenderRoute {...route} key={route.title} />)}
              <Redirect from="/" to="/winning-numbers" />
            </Switch>
          </Layout>
        </HashRouter>
      </Provider>
    </div>
  )
}





export default App