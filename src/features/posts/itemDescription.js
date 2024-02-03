import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';

const itemsDescription = () => {
    const { id } = useParams()
    const item = useSelector(state => state.data.find(el => el.id === Number(id)))
    
    return (
        <div className="item-description">
            <h1>
                {item.title}
            </h1>
            <p>
                {item.body}
            </p>
            <Link to='/'><button>назад</button></Link>
        </div>
    )
}
export default itemsDescription