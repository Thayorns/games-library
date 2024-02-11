import { Link } from "react-router-dom"
import { Spin } from 'antd'
import { useGetPostsQuery } from "../api/apiSlice"
import { useEffect, useState } from "react"

const ItemsList = () => {
    const [start, setStart] = useState(0)
    const [limit, setLimit] = useState(5)
    const { data: posts, isLoading, isSuccess, isError, error, refetch } = useGetPostsQuery({ limit, start })

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
        // setStart((prevStart) => prevStart + 5)
        setLimit((prevLimit) => prevLimit + 5)
        refetch({ limit: limit + 5 })
    }
    
    // useEffect(() => {
        
    // },[])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, )

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
        content = <div id="error-page">Error: 'something went wrong' {error.message}</div>
    }
    

    return (
        <section>
            <h1>Posts</h1>
            {content}
        </section>
    )
}
export default ItemsList