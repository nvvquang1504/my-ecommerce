import {useState, useEffect} from 'react';
import {IProduct} from '../interfaces';
import {getDocs} from "firebase/firestore";
import {productRef} from "../services/firebase";
import {toast} from "react-toastify";

export const useProductList = () => {
    const [productList, setProductList] = useState<IProduct[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(productRef);
            const data: IProduct[] = [];
            querySnapshot.forEach((doc) => {
                const product: IProduct = doc.data();
                data.push(product);
            });
            setProductList(data);
        };
        fetchData().catch(e => toast.error(e));
    }, []);
    return productList
}