import { useState } from 'react';
import ListItem from '../pages/list-item';

import './styles/index.css'
import './styles/normalize.css'
import './styles/vars.css'

const App = () => {

  const [ data, setData ] = useState([])
    
  async function fetchData() {
    const requestURL = 'https://jsonplaceholder.typicode.com/posts'
    const request = new Request(requestURL)
    const response = await fetch(request)
    const fetchedData = await response.json()
    setData(fetchedData)
  }
    
  return (
    <div className="App">
      <button onClick={fetchData}>get data</button>
      <ul>
        {data.map(el => {
          return (
            <ListItem el={el}/>
          )
        })}
      </ul>
    </div>
  )
}
export default App
