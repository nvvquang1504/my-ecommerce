import React, {ChangeEvent, useRef, ComponentType, useMemo, useEffect} from "react";
import {
    Paper,
    Grid,
    Container,
    FormControl,
    Select,
    MenuItem,
    Stack,
    SelectChangeEvent,
    AccordionSummary,
    Accordion,
    Typography,
    AccordionDetails,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button

} from '@mui/material';
import {MdExpandMore} from 'react-icons/md'
import {useState} from 'react';
import {useProductList} from "../hooks/useProductList";
import {IComponentWithFilterProps} from "../interfaces";
import _ from 'lodash';
import {FcFilledFilter} from 'react-icons/fc'

export const withFilter = (Component: ComponentType<IComponentWithFilterProps>): ComponentType => {
    return (props) => {
        const productList: IComponentWithFilterProps['productList'] = useProductList();
        const [filterType, setFilterType] = useState<IComponentWithFilterProps['filterType']>('type');
        const [checkList, setCheckList] = useState<IComponentWithFilterProps['checkList']>(null);
        const [filterOpt, setFilterOpt] = useState<IComponentWithFilterProps['filterOpt']>(null)
        const handleChange = (event: SelectChangeEvent) => {
            setFilterType(event.target.value);
        }
        const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
            const {name, checked} = event.target;
            setCheckList((prevState) => {
                return {
                    ...prevState,
                    [name]: checked
                }
            })
        }
        const applyFilter = () => {
            setFilterOpt({checkList});
        }
        const accordionMemo = useMemo(() => {
            return productList ? _.uniqBy(productList, 'category').map(item => item.category) : [];
        }, [productList])

        return <Container maxWidth={'lg'} style={{marginTop: '1rem'}}>
            <div className={'with-filter-layout'}>
                <Grid container spacing={3}>
                    <Grid sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }} item xs={3}>
                        <Button
                            fullWidth={true}
                            variant={'contained'}
                            onClick={applyFilter}
                            endIcon={<FcFilledFilter/>}
                        >
                            Apply filter
                        </Button>
                        <Paper className={'filter-tool-left'} variant={'outlined'}>
                            <Accordion disableGutters={true} defaultExpanded>
                                <AccordionSummary expandIcon={<MdExpandMore/>}>
                                    <Typography variant={'h6'}>Type</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {
                                            accordionMemo.map((item) => {
                                                return <FormControlLabel key={item} control={<Checkbox name={item}
                                                                                                       onChange={handleCheckBoxChange}/>}
                                                                         label={item}/>
                                            })
                                        }
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion disableGutters={true}>
                                <AccordionSummary
                                    expandIcon={<MdExpandMore/>}
                                >
                                    <Typography variant={'h6'}>Price</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={'filter-tool-up'} variant={'outlined'}>
                            <Stack
                                justifyContent={'center'}
                                alignItems={'center'}
                                flexDirection={'row'}
                            >
                                <span>Sort by:</span>
                                <FormControl sx={{m: 1, minWidth: 120}} size="small">
                                    <Select
                                        id="select-filter"
                                        value={filterType}
                                        onChange={handleChange}
                                        sx={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        <MenuItem value={'type'}>Type</MenuItem>
                                        <MenuItem value={'priceAscending'}>{`Price: Ascending`}</MenuItem>
                                        <MenuItem value={'priceDecreasing'}>{`Price: Decreasing`}</MenuItem>
                                        <MenuItem value={'nameZA'}>{`Name: Z -> A`}</MenuItem>
                                        <MenuItem value={'nameAZ'}>{`Name: A -> Z`}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Paper>
                        <Component {...props} filterType={filterType} productList={productList} filterOpt={filterOpt}/>
                    </Grid>
                </Grid>
            </div>
        </Container>
    }
}

