// import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

const ItemsList = () => {

    const items = useSelector(state => state.items)
    const renderedPosts = items.map(item => (
            <li className='li-container'>
                <span>№{item['id']}</span>
                <h1>{item['title'].slice(0, 6)}</h1>
                <p>{item['body']}</p>
            </li>
        )
    )
    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
export default ItemsList