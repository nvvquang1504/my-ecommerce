import {ref, listAll, getDownloadURL} from "firebase/storage";
import {storage} from "../../../../services/firebase";

const ProductList = () => {
    const productRef = ref(storage, 'products/ahihi');
    getDownloadURL(productRef).then((url) => {
        console.log(url);
    })
    return (
        <div>
            ProductList
        </div>
    );
};

export default ProductList;