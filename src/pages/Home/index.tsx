import styles from './style.scss';
import Slider from "../../components/Slider";
import {withLayout} from "../../utils/withLayout";
const Home = () => {
    return (
        <section className={'home-page'}>
            <Slider/>
        </section>
    );
};

export default withLayout(Home);