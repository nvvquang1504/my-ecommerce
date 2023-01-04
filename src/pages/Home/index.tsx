import styles from './style.module.scss';
import Slider from "../../components/Slider";
import {withLayout} from "../../utils/withLayout";
const Home = () => {
    return (
        <div>
            <Slider/>
        </div>
    );
};

export default withLayout(Home);