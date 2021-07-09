import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

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

        <Link to='/dashbord/adduser'>
            <ListItem button>
                <ListItemIcon>
                    <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Add User" />
            </ListItem>
        </Link>

        <Link to='/dashbord/listusers'>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="List Users" />
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