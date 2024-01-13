
import { useState} from 'react';
import ListItem from '../pages/list-item';
// import { useDispatch } from 'react-redux';

import './index.css'
import './styles/normalize.css'
import './styles/vars.css'
// import { postsSlice } from '../features/posts/postsSlice';

const App = () => {
  const [data, setData] = useState([])
  // const dispatch = useDispatch()
  async function fetchData() {
    const requestURL = 'https://jsonplaceholder.typicode.com/posts'
    const request = new Request(requestURL)
    const response = await fetch(request)
    const data = await response.json()
    setData(data)
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
