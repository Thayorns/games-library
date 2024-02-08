import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useGetPostQuery } from "../api/apiSlice"


const ItemDescription = () => {
    const { itemId } = useParams()
    
    const {data: item, isFetching, isSuccess } = useGetPostQuery(itemId)

    let content

    if(isFetching){
        content = <Spin/>
    }else if(isSuccess){
        content = (
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
    return <div>{content}</div>
}
export default ItemDescription