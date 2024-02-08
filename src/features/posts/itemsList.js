import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from "./itemsSlice"
import { Spin } from 'antd'

const ItemsList = () => {
    const dispatch = useDispatch()
    const items = useSelector(selectAllPosts)
    const postStatus = useSelector(state => state.items.status)
    const error = useSelector(state => state.items.error)
    useEffect(() => {
        if (postStatus === 'idle') {
          dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content

    if(postStatus === 'loading'){
        content = <Spin />
    }else if(postStatus === 'succeeded'){
        content = items.map((item,index) => (
            <li className='li-container' key={index}>
                <span># {item.id}</span>
                <h2>{item.title.slice(0, 6)}</h2>
                <p>{item.body}</p>
                <Link to={`/posts/${item.id}`} className="button-view-post">
                    View Post
                </Link>
            </li>)    
        )
    }else if(postStatus === 'failed'){
        content = <div>{error}</div>
    }
    

    return (
        <section>
            <h1>Posts</h1>
            {content}
        </section>
    )
}
export default ItemsList