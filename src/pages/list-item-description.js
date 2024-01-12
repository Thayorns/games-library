import { useLocation } from 'react-router-dom';

const ListItemDescription = () => {
    const location = useLocation();
    const { el } = location.state;
    return (
        <>
            <h1>{el['title']}</h1>
            <p>{el['body']}</p>
        </>
    )
}
export default ListItemDescription