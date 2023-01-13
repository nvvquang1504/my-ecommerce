import {ref, getDownloadURL} from "firebase/storage";
import {query, where, getDocs} from "firebase/firestore";
import {productRef, productStorageRef} from '../../../../services/firebase'
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {IProduct} from '../../interfaces'
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Paper} from "@mui/material";

interface GridColOpt extends GridColDef {
    field: 'id' | 'category' | 'title' | 'description' | 'image' | 'price' | 'rating'
}

const columns: GridColOpt[] = [
    {
        field: 'image',
        headerName: 'Image',
        renderCell: (params) => {
            return <img style={{width: '100%'}} src={params.value} alt="image"/>
        },
    },
    {field: 'id', headerName: 'ID', hide: true, flex: 1},
    {field: 'category', headerName: 'Category', minWidth: 100},
    {field: 'title', headerName: 'Title', flex: 1},
    {field: 'price', headerName: 'Price', minWidth: 100},
    {field: 'description', headerName: 'Description', flex: 1},
];
const ProductList = () => {
    const [productList, setProductList] = useState<Array<{}>>([]);
    /**@DidMount-------------------------------------------------------------- */
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
    return (
        <Paper sx={{
            height: '500px'
        }}>
            {
                productList.length > 0 && <DataGrid
                    columns={columns}
                    rows={productList}
                />
            }
        </Paper>
    );
};

export default ProductList;