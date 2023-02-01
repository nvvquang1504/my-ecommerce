import {useParams} from 'react-router-dom';
import {useProductList} from "../../hooks/useProductList";
import {useMemo, useState} from "react";
import {Container, Grid, Box, Stack, Typography, StackProps, Rating, Divider, GridProps} from '@mui/material';
import {withLayout} from "../../utils/withLayout";
import './style.scss';
import DetailCarousel from "./Carousel";
import forgotImage from '../../assets/forgot.png';
import registerImage from '../../assets/register.png';
import loginImage from '../../assets/login.png';
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {cartRef} from '../../services/firebase';
import {doc, setDoc, collection, increment, updateDoc, getDoc, getDocs} from "firebase/firestore";

const primaryColor = '#FF7722';

const RowStack = (props: StackProps) => {
    return (
        <Stack {...props} direction={'row'}>
            {props.children}
        </Stack>
    )
}
const Item = (props: { active: number, children: number | string }) => {
    return (
        <div    {...props} style={{
            border: props.active ? `1px solid ${primaryColor}` : '1px solid transparent',
            padding: '0.5rem 0',
            cursor: 'pointer',
            textAlign: 'center',
            color: props.active ? primaryColor : '',
        }}
        >
            {props.children}
        </div>

    )
}
const Item2 = ({borderColor, ...props}: any) => {
    return (
        <div {...props} style={{
            padding: '0.5rem 0',
            cursor: 'pointer',
            textAlign: 'center',
            color: props.color,
            background: props.background,
            border: `1px solid ${borderColor}`,
        }}
        >

        </div>

    )
}

const Detail = () => {
    const productList = useProductList();
    const auth = useAppSelector(state => state.auth);
    const params = useParams();
    const [detailState, setDetailState] = useState({
        activeOption: 0,
        quantity: 1,
        bigImageLink: ''
    });
    const singleProductMemo = useMemo(() => {
        return productList.find(product => product.id == params.id);
    }, [params, productList]);

    const {id, category, image, title, description, rating, price} = singleProductMemo || {};
    const handleChooseOption = (eventIndex: number) => {
        setDetailState({...detailState, activeOption: eventIndex})
    }
    const increaseQuantity = () => {
        setDetailState((prevState) => (
            {
                ...prevState,
                quantity: prevState.quantity + 1
            }
        ))
    }
    const decreaseQuantity = () => {
        setDetailState((prevState) => (
            {
                ...prevState,
                quantity: prevState.quantity > 1 ? prevState.quantity - 1 : prevState.quantity
            }
        ))
    }
    const changeBigImage = (link: string) => {
        setDetailState({...detailState, bigImageLink: link})
    }

    const gridCombo: { first: number, second: number, third: number } = {
        first: 2,
        second: 5,
        third: 5
    }
    const imageListMemo = useMemo(() => {
        return image ? [image, loginImage, registerImage, forgotImage, image] : undefined
    }, [image])
    const addToCart = async (): Promise<any> => {
        if (auth.userId && id) {
            const cartDoc = doc(cartRef, auth.userId, 'cartItems', `${id}`);
            try {
                const resultGetCartDoc = await getDoc(cartDoc);
                if (!resultGetCartDoc.exists()) {
                    const resulstSetDoc = await setDoc(cartDoc, {
                        id,
                        price,
                        image,
                        quantity: 1
                    });
                } else {
                    const resulstSetDoc = await updateDoc(cartDoc, {
                        quantity: increment(1)
                    });
                }
            } catch (e: any) {
                // Handle error here
                console.log(e)
            } finally {
                const cartItemCollection = collection(cartRef, auth.userId, 'cartItems');
                const querySnapshot = await getDocs(cartItemCollection)
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            }
        }

    }
    return (
        <Container className={'detailPage'}>
            {
                singleProductMemo ? <Grid height={'100%'} container>
                        <Grid item xs={gridCombo.first} height={'100%'} pr={4}>
                            {/*Carousel here*/}
                            <DetailCarousel
                                imageList={imageListMemo}
                                changeBigImage={changeBigImage}
                            />
                        </Grid>
                        <Grid item xs={gridCombo.second} height={'100%'}>
                            <Box sx={{
                                height: '100%',
                                background: '#F4F4F4',
                            }}>
                                <Stack
                                    height={'100%'}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}>
                                    {/*TODO:Hide Image for development*/}
                                    <img style={{
                                        transform: 'scale(0.4)'
                                    }} src={detailState.bigImageLink} alt=""/>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={gridCombo.third}>
                            {/*Detail here*/}
                            <Box p={'34px'} pr={0}>
                                {/*CATEGORY*/}
                                <Stack>
                                    <RowStack>
                                        <span style={{marginRight: '10px', fontWeight: '600'}}>Category:</span>
                                        <span>{category}</span>
                                    </RowStack>
                                </Stack>
                                {/*TITLE*/}
                                <Typography fontWeight={'600'} variant={'h4'}>{title}</Typography>
                                {/*RATING*/}
                                <Rating value={rating?.rate} max={5} readOnly={true}/>
                                <Divider/>
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} py={'1rem'}>
                                    <Grid container spacing={1}>
                                        {
                                            [...new Array(6)].map((item, index) => {
                                                return (
                                                    <Grid key={index} item xs={4} onClick={() => {
                                                        handleChooseOption(index)
                                                    }}>
                                                        <Item
                                                            active={detailState.activeOption === index ? 1 : 0}>{`Option ${index + 1}`}</Item>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Box>
                                <Divider/>
                                <Box>
                                    <Stack direction={'row'} alignItems={'center'} py={'1rem'}>
                                    <span style={{
                                        fontSize: '2rem'
                                    }}>
                                        ${price && price * 0.8}
                                    </span>
                                        <span style={{
                                            fontSize: '1.6rem',
                                            textDecorationLine: 'line-through',
                                            color: '#D9D9D9',
                                            marginLeft: '20px'
                                        }}>
                                        ${price}
                                    </span>
                                    </Stack>
                                    <Grid container spacing={2}>
                                        <Grid className={'adjustQuality'} item xs={4}>
                                            <table style={{
                                                width: '100%',
                                                height: '100%'
                                            }}>
                                                <tbody>
                                                <tr>
                                                    <td onClick={decreaseQuantity}>-</td>
                                                    <td>{detailState.quantity}</td>
                                                    <td onClick={increaseQuantity}>+</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item2 color={'white'} background={primaryColor} borderColor={primaryColor}>Buy
                                                Now
                                            </Item2>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item2 color={primaryColor} borderColor={primaryColor} onClick={addToCart}>
                                                Add to Cart
                                            </Item2>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    : null
            }

        </Container>
    );
};

export default withLayout(Detail);