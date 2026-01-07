import React from 'react';
import styles from './style.module.scss';
import { Product } from '../../types/Product';
import ProductItem from '../ProductItem';

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
