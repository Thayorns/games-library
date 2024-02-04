import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

const ItemsList = () => {

    const items = useSelector(state => state.items)
    const renderedPosts = items.map((item,index) => (
            <li className='li-container' key={index}>
                <span># {item['id']}</span>
                <h2>{item['title'].slice(0, 6)}</h2>
                <p>{item['body']}</p>
                <Link to={`/items/${item['id']}`} className="button-view-post">
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