import styles from './style.scss';
import Slider from "../../components/Slider";
import {withLayout} from "../../utils/withLayout";
import ProductList from "../../components/ProductList";
import {Container} from '@mui/material';

const Home = () => {
    return (
        <section className={'home-page'}>
            <Slider/>
            {/*<Container>*/}

            {/*</Container>*/}
            <ProductList/>
        </section>
    );
};

export default withLayout(Home);