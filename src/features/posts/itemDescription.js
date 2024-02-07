import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';

const ItemDescription = () => {
    const { itemId } = useParams()
    const item = useSelector(state => state.items.posts.find(el => el.id === itemId))
    
    return (
        <div className="item-description">
            <h1>
                {item.title}
            </h1>
            <p className='item-description-paragraph'>
                {item.body}
            </p>
            <Link to='/' className="button-view-post">Back to posts</Link>
        </div>
    )
}
export default ItemDescription