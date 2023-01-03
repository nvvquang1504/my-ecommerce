import {useAppSelector} from "../../redux/hooks";

const ShowOnLogin = (props: { children: JSX.Element }) => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    if (isLoggedIn) {
        return props.children;
    }
    return null;
};
export default ShowOnLogin;