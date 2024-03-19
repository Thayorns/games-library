import React from "react"
import { Link } from "react-router-dom"
import { Spin } from 'antd'
import { useGetPostsQuery } from "../api/apiSlice"
import { useEffect, useState } from "react"

const ItemsList = () => {
    const [limit, setLimit] = useState(10)
    const { data: posts, isLoading, isSuccess, isError, error, refetch } = useGetPostsQuery({ limit, start: 0 })
    const [newPosts, setNewPosts] = useState<any[]>([])
    const [isFetching, setIsFetching] = useState(false)
    let content
    
    const handleClick = (e: string) => {
      if(e === 'click'){ //e.type
        setLimit((prevLimit) => prevLimit + 5)
        setNewPosts(
          (prevNewPosts) => [...prevNewPosts, ...posts]//useState<any[]>
        )
        setIsFetching(true)
      }
    }
  
    useEffect(() => {
      if (!isFetching) return
      refetch().unwrap().then(() => {
        setIsFetching(false)
      })
    }, [isFetching, posts, refetch])

    type mappedPost = {
      id: number
      title: string
      body: string
    }
    // type FetchBaseQuerryError = {
    //   status: number
    //   data: unknown
    //   message: string
    // }
    if (isLoading) {
      content = <Spin />
    } else if (isSuccess) {
      content = posts.map((item: mappedPost, index: number) => (
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
      content = <div id="error-page">Error: Something went wrong {'message' in error ? error.message : ''}</div>//проверка на undefined
    }
  
    return (
      <section>
        <h1>Posts</h1>
        <ul>
          {content}
          {/* тут видимо вернуть строку изза e */}
          <button className={isLoading ? 'active-none' : 'active'} onClick={()=> handleClick}>Load more posts</button>
          {isFetching && (<ul className="newposts-loading">loading...</ul>)}
        </ul>
      </section>
    )
  }
  
  export default ItemsList