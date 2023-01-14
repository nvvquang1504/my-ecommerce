import './style.scss';
import {FaStar} from 'react-icons/fa'
import {IProduct} from "../../../interfaces";
import {Typography} from "@mui/material";

interface IProductCardProps {
    product: IProduct
}

const ProductCard = (props: IProductCardProps): JSX.Element => {
    const {id, image, price, title, description} = props.product;
    return (
        <div className={'product'}>
            <div className="image">
                <img src={image} alt="image"/>
            </div>
            <div className="namePrice">
                <label title={title}></label>
                <Typography title={title} noWrap={true} variant={'h3'}>{title}</Typography>
                <span>{price}</span>
            </div>
            {/*<p>{description}</p>*/}
            <div className="stars">
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
            </div>
            <div className="bay">
                <button>Bay now</button>
            </div>
        </div>
    );
};

export default ProductCard;