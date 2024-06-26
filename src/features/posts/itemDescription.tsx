import React from "react"
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useGetGameQuery } from "../api/apiSlice"
import { Button } from 'antd'

const ItemDescription = () => {
    const { itemId } = useParams()
    
    const {data: item, isFetching, isSuccess } = useGetGameQuery(itemId)
    

    let content

    if(isFetching){
        content = <Spin/>
    }else if(isSuccess){
        content = (
            <div className="item-description">
                <span className='item-description-span'>id - {itemId}</span>
                <h6>
                    {item.name}
                </h6>
                <p className='item-description-paragraph'>
                    {item.description}
                </p>
                <Link to='/' className="button-view-post"><Button>назад</Button></Link>
            </div>
        )
    }
    return <div>{content}</div>
}
export default ItemDescription