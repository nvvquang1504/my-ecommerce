import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import {useNavigate, Outlet, useLocation, useNavigation, useMatch} from "react-router-dom";

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
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        navigate(newValue);
        setActiveTab(newValue);
    };
    useEffect(() => {
        const path = location.pathname;
        const pathDeps = path.split('/');
        const isMatched = pathDeps.length === 4 && pathDeps[3];
        if (isMatched) {
            const matchedOutlet = pathDeps[3];
            navigate(matchedOutlet);
            setActiveTab(matchedOutlet);
        } else {
            navigate('add');
            setActiveTab('add');
        }
    }, [])
    return (
        <>
            {
                activeTab
                    ? <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
                                <Tab value={'add'} label="Add Products"  {...a11yProps(0)} />
                                <Tab value={'list'} label="Product List" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <Box p={3}>
                            <Outlet/>
                        </Box>
                    </Box>
                    : null
            }
        </>

    );
};

export default Products;