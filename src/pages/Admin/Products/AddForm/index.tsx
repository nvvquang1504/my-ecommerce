import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Grid,
    Paper,
    Stack,
    TextareaAutosize,
    TextField as MuiText,
    TextFieldProps
} from '@mui/material';
import {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {getDocs, addDoc} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {toast} from 'react-toastify';
import {productRef, productStorageRef} from '../../../../services/firebase'
import Upload from "./Upload";
import {IProduct} from '../../interfaces'
import _, {forEach} from 'lodash';
import {faker} from '@faker-js/faker'

const TextField = (props: TextFieldProps) => {
    return <MuiText  {...props} size={'small'} variant={'standard'} InputLabelProps={{shrink: true}}/>
}
const AddForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const ratingRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const [imgUrl, setImgUrl] = useState<string>('');
    const [file, setFile] = useState<any>(null);
    const [data, setData] = useState<IProduct[]>([]);
    // Upload file to firestorage


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(e => console.log(e))
    }, [])
    const getInputData = (): IProduct => {
        return {
            // name: nameRef.current?.value,
            // price: priceRef.current?.value,
            // material: materialRef.current?.value,
            // adjective: adjRef.current?.value,
            // description: desRef.current?.value,
            // type: typeRef.current?.value,
        }
    }
    const uploadImgToStorage = async () => {
        const imageRef = ref(productStorageRef, file.name);
        if (file) {
            if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
                return await uploadBytes(imageRef, file);
            } else {
                toast.error('Wrong image type');
            }
        } else {
            toast.error('You need to upload image for this product');
        }
    }
    // const addProduct = async (event: SyntheticEvent): Promise<any> => {
    //     const product: IProduct = getInputData();
    //     // Create reference to products storage
    //     let docIdList: string[] = [];
    //     try {
    //         const querySnapshot = await getDocs(productRef);
    //         // First upload image to storage
    //         const uploadResult = await uploadImgToStorage();
    //         if (uploadResult) {
    //             // Assign upload result ref to variable
    //             const ref = uploadResult.ref;
    //             // Then retrieve image url with getDownloadURL(ref)
    //             const url = await getDownloadURL(ref);
    //             const resultAddDoc = await addDoc(productRef, {
    //                 ...product,
    //                 url
    //             });
    //             toast.success('Adding Product successfully!');
    //             formRef.current?.reset();
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    const addFakerProduct = async (): Promise<any> => {
        for (let i = 0; i < data.length; i++) {
            try {
                const resultAddDoc = await addDoc(productRef, data[i]);
                // formRef.current?.reset();
            } catch (e) {
                toast.error('error');
            }
        }
        toast.success('Adding Product successfully!');
        // const product: IProduct = generateFakerData();

    }
    const saveFile = (file: any): void => {
        const url = URL.createObjectURL(file);
        setImgUrl(url);
        setFile(file);
    }
    return (
        <Paper sx={{
            width: '100%'
        }} elevation={5}>
            <Grid container>
                <Grid item xs={4}>
                    <Stack
                        ref={formRef}
                        height={'100%'}
                        direction={'column'}
                        spacing={5}
                        p={3}
                        component={'form'}
                        justifyContent={'center'}
                    >
                        <TextField inputRef={idRef} label={'ID'}/>
                        {/*Name*/}
                        <TextField inputRef={titleRef} label={'Product Name'}/>
                        {/*Price*/}
                        <TextField inputRef={priceRef} type={'number'} label={'Price'}/>
                        {/*Category: */}
                        <TextField inputRef={categoryRef} type={'string'} label={'Category'}/>
                        {/*Price*/}
                        {/*<FormControl variant="standard" sx={{m: 1}}>*/}
                        {/*    <InputLabel shrink={true} id="product-type-select-label">Type</InputLabel>*/}
                        {/*    <Select*/}
                        {/*        inputRef={typeRef}*/}
                        {/*        labelId="product-type-select-label"*/}
                        {/*        id="product-type-select"*/}
                        {/*        defaultValue={''}*/}
                        {/*        required*/}
                        {/*        label="Type"*/}
                        {/*    >*/}
                        {/*        {*/}
                        {/*            ["pants", "jackets", "shirts", "t-shirt", "shoes"].map((item) => {*/}
                        {/*                const name = _.capitalize(_.join(item.split(" ")));*/}
                        {/*                return (*/}
                        {/*                    <MenuItem key={name} value={name}>{name}</MenuItem>*/}
                        {/*                )*/}
                        {/*            })*/}
                        {/*        }*/}
                        {/*    </Select>*/}
                        {/*</FormControl>*/}
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    {/*Description*/}
                    <Stack p={3}>
                        <Stack mb={3} justifyContent={'center'} alignItems={'center'}>
                            <Upload saveFile={saveFile} imgUrl={imgUrl}/>
                        </Stack>
                        <TextareaAutosize ref={descriptionRef} minRows={5}/>
                    </Stack>
                </Grid>
            </Grid>
            <Stack p={2}>
                <Button variant={'contained'} onClick={addFakerProduct}>Add Product</Button>
            </Stack>
        </Paper>
    );
};
export default AddForm;