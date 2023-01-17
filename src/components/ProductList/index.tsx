import {useMemo} from 'react';
import ProductCard from "./ProductCard";
import {Grid} from "@mui/material";
import {withFilter} from "../../utils/withFilter";
import _ from 'lodash';
import {IComponentWithFilterProps} from '../../interfaces'

const ProductList = ({filterType, productList, filterOpt}: IComponentWithFilterProps) => {
    const productMemo = useMemo(() => {
        let filterProductList = [...productList || []];
        if (filterType && productList) {
            switch (filterType) {
                case 'type':
                    filterProductList = _.orderBy(productList, ['category']);
                    break;
                case 'priceAscending':
                    filterProductList = _.orderBy(productList, ['price'], ['asc']);
                    break;
                case 'priceDecreasing':
                    filterProductList = _.orderBy(productList, ['price'], ['desc']);
                    break;
                case 'nameZA':
                    filterProductList = _.orderBy(productList, [product => product.title?.toLowerCase()], ['desc']);
                    break;
                case 'nameAZ':
                    filterProductList = _.orderBy(productList, [product => product.title?.toLowerCase()], ['asc']);
                    break;
                default:
                    break;
            }
            if (filterOpt && filterOpt.checkList) {
                const mahArr: string[] = [];
                Object.keys(filterOpt.checkList).map((key) => {
                    if (filterOpt?.checkList?.[key]) {
                        mahArr.push(key);
                    }
                });
                if (mahArr.length > 0) {
                    filterProductList = _.filter(filterProductList, (prod) => {
                        return mahArr.includes(prod.category!);
                    })
                }
            }
        }
        return filterProductList;
    }, [filterType, productList, filterOpt]);
    return (
        <section className={'productList'}>
            <Grid container spacing={3}>
                {
                    productMemo && productMemo.map((product, index) => {
                        return (
                            <Grid key={index} item xs={4}>
                                <ProductCard product={product}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </section>
    );
};
export default withFilter(ProductList);