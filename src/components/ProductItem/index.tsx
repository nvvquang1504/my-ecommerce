import React from 'react';
import styles from './style.module.scss';
import { Product } from '../../types/Product';
import { useAppDispatch } from '../../redux/hooks';
import { ADD_TO_CART } from '../../redux/slice/cartSlice';
import { toast } from 'react-toastify';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(ADD_TO_CART(product));
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className={styles.product}>
            <div className={styles.imageContainer}>
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    <button 
                        className={styles.addBtn}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
