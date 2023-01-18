import {useParams} from 'react-router-dom';
import {useProductList} from "../../hooks/useProductList";
import {useMemo} from "react";
import {Container, Grid, Box, Stack, Typography, StackProps} from '@mui/material';
import {withLayout} from "../../utils/withLayout";

const RowStack = (props: StackProps) => {
    return (
        <Stack {...props} direction={'row'}>
            {props.children}
        </Stack>
    )
}

const StarGroup = (props: { value: number }) => {

    return (
        <Stack className={'stars'}>
            {
                Array.from(Array(props.value).keys()).map(() => {
                    return (

                    )
                })
            }
        </Stack>
    )
}


const Detail = () => {
    const productList = useProductList();
    const params = useParams();
    const singleProductMemo = useMemo(() => {
        return productList.find(product => product.id == params.id);
    }, [params, productList]);
    console.log(singleProductMemo)
    return (
        <Container>
            <Grid container>
                <Grid item xs={2}>
                    {/*Carousel here*/}

                </Grid>
                <Grid item xs={5}>
                    <Box sx={{
                        // width: '100%',
                        height: 500,
                        background: '#fff',
                    }}>
                        <Stack
                            p={'40px'}
                            height={'100%'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <img style={{
                                width: '100%',
                                // height: "auto"
                            }} src={singleProductMemo?.image} alt=""/>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    {/*Detail here*/}
                    <Box p={'34px'}>
                        <Stack>
                            <RowStack>
                                <span style={{
                                    marginRight: '10px',
                                    fontWeight: '600'
                                }}>Category:</span>
                                <span>{singleProductMemo?.category}</span>
                            </RowStack>
                        </Stack>
                        <Typography fontWeight={'600'} variant={'h5'}>{singleProductMemo?.title}</Typography>
                        <Stack className={'stars'}>

                        </Stack>
                        <Grid container>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default withLayout(Detail);