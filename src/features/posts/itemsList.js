import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from "./itemsSlice"

const ItemsList = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.posts)
    const postStatus = useSelector(state => state.items.status)

    useEffect(() => {
        if (postStatus === 'idle') {
          dispatch(fetchPosts())
        }
      }, [postStatus, dispatch])
    
    const renderedPosts = items.map((item,index) => (
            <li className='li-container' key={index}>
                <span># {item.id}</span>
                <h2>{item.title.slice(0, 6)}</h2>
                <p>{item.body}</p>
                <Link to={`/items/posts/${item.id}`} className="button-view-post">
                    View Post
                </Link>
            </li>
        )
    )
    return (
        <section>
            <h1>Posts</h1>
            {renderedPosts}
        </section>
    )
}
export default ItemsList