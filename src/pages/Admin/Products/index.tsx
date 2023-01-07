import React, {useState} from 'react';
import {Box, Tab, Tabs, Typography,} from '@mui/material';
import AddForm from "./AddForm";
import ProductList from "./ProductList";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <span>{children}</span>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Products = () => {
    const [value, setValue] = useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Add Products"  {...a11yProps(0)} />
                    <Tab label="Product List" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AddForm/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProductList/>
            </TabPanel>
            <TabPanel value={value} index={2}>
            </TabPanel>
        </Box>
    );
};

export default Products;