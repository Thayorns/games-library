import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ListItem from '../features/posts/list-item';

import './index.css'
import './styles/normalize.css'
import './styles/vars.css'

const App = () => {
  

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route exact 
            path="/"
            render={() => (
              <ul>
                <ListItem/>
              </ul>
            )} 
          />

          <Redirect to="/" />

        </Switch>
      </div>
    </Router>
  )
}
export default App
