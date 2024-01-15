// import { useEffect } from 'react';
import { setData } from '../features/posts/dataReducer';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../pages/list-item';

import './index.css'
import './styles/normalize.css'
import './styles/vars.css'

const App = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)

  async function fetchData() {
    const requestURL = 'https://jsonplaceholder.typicode.com/posts'
    const request = new Request(requestURL)
    const response = await fetch(request)
    const data = await response.json()
    dispatch(setData(data));
  }
  // useEffect(() => {
  //   fetchData();
  // },[]);

  return (
    <div className="App">
      <button onClick={fetchData}>get data</button>
      <ul>
        {data.map((el,index) => {
          return (
            <ListItem el={el} key={index}/>
          )
        })}
      </ul>
    </div>
  )
}
export default App
