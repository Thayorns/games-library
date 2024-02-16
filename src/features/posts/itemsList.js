import { Link } from "react-router-dom"
import { Spin } from 'antd'
import { useGetPostsQuery } from "../api/apiSlice"
import { useEffect, useState } from "react"

const ItemsList = () => {
    const [limit, setLimit] = useState(10)
    const { data: posts, isLoading, isSuccess, isError, error, refetch } = useGetPostsQuery({ limit, start: 0 })
    const [newPosts, setNewPosts] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    let content
    
    const handleClick = (e) => {
      if(e.type === 'click'){
        setLimit((prevLimit) => prevLimit + 5)
        setNewPosts((prevNewPosts) => [...prevNewPosts, ...posts])
        setIsFetching(true)
      }
      // if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return
      // setLimit((prevLimit) => prevLimit + 5)
      // setNewPosts((prevNewPosts) => [...prevNewPosts, ...posts])
      // setIsFetching(true)
    }
  
    useEffect(() => {
      if (!isFetching) return
      refetch().unwrap().then(() => {
        setIsFetching(false)
      })
    }, [isFetching, posts, refetch])
  
    // useEffect(() => {
    //   window.addEventListener('scroll', handleScroll)
    //   return () => window.removeEventListener('scroll', handleScroll)
    // }, )
    
  
    if (isLoading) {
      content = <Spin />
    } else if (isSuccess) {
      content = posts.map((item, index) => (
        <li className='li-container' key={index}>
          <span># {item.id}</span>
          <h2>{item.title.slice(0, 6)}</h2>
          <p>{item.body}</p>
          <Link to={`/posts/${item.id}`} className="button-view-post">
            View Post
          </Link>
        </li>
      ))
    } else if (isError) {
      content = <div id="error-page">Error: Something went wrong {error.message}</div>
    }
  
    return (
      <section>
        <h1>Posts</h1>
        <ul>
          {content}
          <button className={isLoading ? 'active-none' : 'active'} onClick={handleClick}>Load more posts</button>
          {isFetching && (<ul className="newposts-loading">loading...</ul>)}
        </ul>
      </section>
    )
  }
  
  export default ItemsList