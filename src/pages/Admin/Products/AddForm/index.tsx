import {Button, Grid, Paper, Stack, TextareaAutosize, TextField as MuiText, TextFieldProps} from '@mui/material';
import {useState, useRef, SyntheticEvent, useEffect} from 'react';
import {SketchPicker} from 'react-color'; // User for picking color for product
import {collection, doc, setDoc, getDocs} from "firebase/firestore";
import {getStorage, ref} from "firebase/storage";
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
    const addProduct = async (event: SyntheticEvent): Promise<any> => {
        // formRef.current?.reset();

        const productStorageRef = ref(storage, 'products');
        const productRef = collection(db, 'products');
        const querySnapshot = await getDocs(productRef);
        let docIdList: string[] = [];
        await querySnapshot.forEach((doc) => {
            docIdList.push(doc.id);
        })
        let isExist = docIdList.some(id => id === idRef.current?.value);
        if (!isExist && idRef.current?.value) {
            await setDoc(doc(db, "products", idRef.current.value), {
                name: nameRef.current?.value,
                price: priceRef.current?.value,
                type: typeRef.current?.value,
                description: desRef.current?.value,
                brand: brandRef.current?.value
            });
        } else {
            toast.error('can not add data with duplicate id');
        }
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