import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import ViewListIcon from '@material-ui/icons/ViewList';
import { Link } from 'react-router-dom';

export default function ClientMenuListItems() {
  return (
    <div>
        <Link to='/dashbord'>
            <ListItem button >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
        </Link>

        {/* <Link to='/dashbord/myfinishedorders'>
            <ListItem button>
                <ListItemIcon>
                    <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
            </ListItem>
        </Link> */}

        <Link to='/dashbord/profile'>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
            </ListItem>
        </Link>
    </div>
  )
};