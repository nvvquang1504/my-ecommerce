import {Button, Grid, Paper, Stack, TextareaAutosize, TextField as MuiText, TextFieldProps} from '@mui/material';
import {useState, useRef, SyntheticEvent} from 'react';
import {SketchPicker} from 'react-color'; // User for picking color for product
import {collection, doc, setDoc, getDocs} from "firebase/firestore"
import {db} from '../../../../services/firebase'
import {toast} from 'react-toastify';
import products from "../index";
import _ from 'lodash';

const TextField = (props: TextFieldProps) => {
    return <MuiText size={'small'} variant={'standard'}  {...props}/>
}
const AddForm = () => {
    const idRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const desRef = useRef<HTMLTextAreaElement>(null);
    const brandRef = useRef<HTMLInputElement>(null);
    const addProduct = async (event: SyntheticEvent): Promise<any> => {
        formRef.current?.reset();
        // const productRef = collection(db, 'products');
        // const querySnapshot = await getDocs(productRef);
        // let docIdList: string[] = [];
        // await querySnapshot.forEach((doc) => {
        //     docIdList.push(doc.id);
        // })
        // let isExist = docIdList.some(id => id === idRef.current?.value);
        // if (!isExist && idRef.current?.value) {
        //     await setDoc(doc(db, "products", idRef.current.value), {
        //         name: nameRef.current?.value,
        //         price: priceRef.current?.value,
        //         type: typeRef.current?.value,
        //         description: desRef.current?.value,
        //         brand: brandRef.current?.value
        //     });
        // } else {
        //     toast.error('can not add data with duplicate id');
        // }

    }
    return (
        <Paper sx={{
            width: '80%'
        }} elevation={5}>
            <Grid container>
                <Grid item xs={6}>
                    <Stack direction={'column'} spacing={1} p={3}>
                        <form ref={formRef}>
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
                        </form>
                        {/*ID*/}

                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    {/*Description*/}
                    <Stack p={3}>
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