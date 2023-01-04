import Header from "../components/Header";
import Footer from "../components/Footer";


export const withLayout = (Page: () => JSX.Element) => {
    return () => {
        return (
            <>
                <Header/>
                <Page/>
                <Footer/>
            </>
        )
    }
}