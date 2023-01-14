import ProductCard from "./ProductCard";
import {Grid} from "@mui/material";
import {useProductList} from "../../hooks/useProductList";
import {withFilter} from "../../utils/withFilter";


const ProductList = () => {
    const productList = useProductList();
    return (
        <section className={'productList'}>
            <Grid container>
                <h3>ahihih</h3>
                {/*{*/}
                {/*    productList && productList.map((product, index) => {*/}
                {/*        return (*/}
                {/*            <Grid key={index} item xs={4}>*/}
                {/*                <ProductCard product={product}/>*/}
                {/*            </Grid>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </Grid>
        </section>
    );
};

export default withFilter(ProductList);