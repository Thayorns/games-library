import { useState } from 'react';
import './App.css';

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
      <button onClick={fetchData}>CLICK</button>
      <ul>
        {data.map(el => {
          return (
            <li className='li-container' key={el['id']}>
              <span>№{el['id']}</span>
              <h1>{el['title'].slice(0,4)}</h1>
              <p>{el['body']}</p>
              <button>просмотр</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default App
