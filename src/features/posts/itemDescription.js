import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { selectPostById } from './itemsSlice'

const ItemDescription = () => {
    const { itemId } = useParams()
    const item = useSelector((state) => selectPostById(state, Number(itemId)))
    console.log(item)
    if (!item) {
        return <h1 className='post-not-found'>Post not found!</h1>
    }else{
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
}
export default ItemDescription