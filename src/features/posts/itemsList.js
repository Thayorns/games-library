import { Link } from "react-router-dom"
import { Spin } from 'antd'
import { useGetPostsQuery } from "../api/apiSlice"

const ItemsList = () => {
    const { data: posts, isLoading, isSuccess, isError, error } = useGetPostsQuery()
    let content

    if(isLoading){
        content = <Spin />
    }else if(isSuccess){
        content = posts.map((item,index) => (
            <li className='li-container' key={index}>
                <span># {item.id}</span>
                <h2>{item.title.slice(0, 6)}</h2>
                <p>{item.body}</p>
                <Link to={`/posts/${item.id}`} className="button-view-post">
                    View Post
                </Link>
            </li>)    
        )
    }else if(isError){
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