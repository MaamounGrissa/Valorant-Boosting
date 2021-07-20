import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

export default function AdminMenuListItems() {
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

        <Link to='/dashbord/paiedorders'>
            <ListItem button>
                <ListItemIcon>
                    <CloudDoneIcon />
                </ListItemIcon>
                <ListItemText primary="Paied orders" />
            </ListItem>
        </Link>

        <Link to='/dashbord/listusers'>
            <ListItem button>
                <ListItemIcon>
                    <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="List users" />
            </ListItem>
        </Link>

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