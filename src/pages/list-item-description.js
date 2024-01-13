// import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom"
const ListItemDescription = () => {
    // const location = useLocation();
    // const { el } = location.state;
    return (
        <div className="item-description">
            <h1>lorem</h1>
            <p>lagoagn</p>
            <Link to='/'><button>назад</button></Link>
        </div>
    )
}
export default ListItemDescription