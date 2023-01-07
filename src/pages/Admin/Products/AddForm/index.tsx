import {Button, Grid, Paper, Stack, TextareaAutosize, TextField as MuiText, TextFieldProps} from '@mui/material';
import {useState, useRef, SyntheticEvent, useEffect} from 'react';
import {SketchPicker} from 'react-color'; // User for picking color for product
import {collection, doc, setDoc, getDocs} from "firebase/firestore";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {db} from '../../../../services/firebase'
import {toast} from 'react-toastify';
import products from "../index";
import _ from 'lodash';
import {storage} from '../../../../services/firebase'
import Upload from "./Upload";

const TextField = (props: TextFieldProps) => {
    return <MuiText  {...props} size={'small'} variant={'standard'} InputLabelProps={{shrink: true}}/>
}
const AddForm = () => {
    const idRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const desRef = useRef<HTMLTextAreaElement>(null);
    const brandRef = useRef<HTMLInputElement>(null);
    const [imgUrl, setImgUrl] = useState<string>('');
    const [file, setFile] = useState<any>(null);
    // Upload file to firestorage

    const addProduct = async (event: SyntheticEvent): Promise<any> => {
        const name = nameRef.current?.value
        const price = priceRef.current?.value
        const des = desRef.current?.value
        const type = typeRef.current?.value
        const brand = brandRef.current?.value
        // Create reference to products storage
        const productStorageRef = ref(storage, 'products/ahihi');
        // Create reference to products database
        const productRef = collection(db, 'products');
        // Create id base on brand, type, name
        // const productId = `${brand}_${type}`
        // const querySnapshot = await getDocs(productRef);
        // let docIdList: string[] = [];
        // await querySnapshot.forEach((doc) => {
        //     docIdList.push(doc.id);
        // })
        // // Create ID base on product information
        // let isExist = docIdList.some(id => id === idRef.current?.value);
        // if (!isExist && idRef.current?.value) {
        //     await setDoc(doc(db, "products", idRef.current.value), {
        //         name: nameRef.current?.value,
        //         price: priceRef.current?.value,
        //         type: typeRef.current?.value,
        //         description: desRef.current?.value,
        //         brand: brandRef.current?.value
        //     });
        //     setImgUrl('')
        // } else {
        //     toast.error('can not add data with duplicate id');
        // }
        uploadBytes(productStorageRef, file).then((snapshot) => {
            console.log(snapshot);
            console.log('Uploaded a blob or file!');
        });
    }
    const saveFile = (file: any): void => {
        const url = URL.createObjectURL(file)
        setImgUrl(url);
        setFile(file)
    }
    return (
        <Paper sx={{
            width: '100%'
        }} elevation={5}>
            <Grid container>
                <Grid item xs={4}>
                    <Stack height={'100%'} direction={'column'} spacing={2} p={3} justifyContent={'space-between'}>
                        <TextField inputRef={idRef} label={'ID'}/>
                        {/*Name*/}
                        <TextField inputRef={nameRef} label={'Product Name'}/>
                        {/*Price*/}
                        <TextField inputRef={priceRef} type={'number'} label={'Price'}/>
                        {/*Color: Color Picker*/}
                        {/*<SketchPicker/>*/}
                        {/*Type: */}
                        <TextField inputRef={typeRef} label={'Type'}/>
                        {/*BRAND*/}
                        <TextField inputRef={brandRef} label={'Brand'}/>
                        {/*ID*/}

                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    {/*Description*/}
                    <Stack p={3}>
                        <Stack mb={3} justifyContent={'center'} alignItems={'center'}>
                            <Upload saveFile={saveFile} imgUrl={imgUrl}/>
                        </Stack>
                        <TextareaAutosize ref={desRef} minRows={5}/>
                    </Stack>
                </Grid>
            </Grid>
            <Stack p={2}>
                <Button variant={'contained'} onClick={addProduct}>Add Product</Button>
            </Stack>
        </Paper>
    );
};

export default AddForm;