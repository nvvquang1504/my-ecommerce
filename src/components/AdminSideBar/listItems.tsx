import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {MdOutlineSpaceDashboard, MdOutlineProductionQuantityLimits} from 'react-icons/md';
import {HiOutlineUserGroup} from 'react-icons/hi';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <MdOutlineSpaceDashboard/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <MdOutlineProductionQuantityLimits/>
            </ListItemIcon>
            <ListItemText primary="Products"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <HiOutlineUserGroup/>
            </ListItemIcon>
            <ListItemText primary="Users"/>
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                {/*<AssignmentIcon />*/}
            </ListItemIcon>
            <ListItemText primary="Current month"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                {/*<AssignmentIcon />*/}
            </ListItemIcon>
            <ListItemText primary="Last quarter"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                {/*<AssignmentIcon />*/}
            </ListItemIcon>
            <ListItemText primary="Year-end sale"/>
        </ListItemButton>
    </React.Fragment>
);