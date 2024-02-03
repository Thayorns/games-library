import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ItemsList from '../features/posts/itemsList';

import './index.css'
import './styles/normalize.css'
import './styles/vars.css'

const App = () => {
  
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/"
            element={<ItemsList/>}
          />

        </Routes>
      </div>
    </Router>
  )
}
export default App
