import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ItemsList from '../features/posts/itemsList';
import ItemDescription from '../features/posts/itemDescription';
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
          <Route path="/games/:id" 
            element={<ItemDescription/>} 
          />

        </Routes>
      </div>
    </Router>
  )
}
export default App
