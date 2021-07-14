import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

export default function BoosterMenuListItems() {
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

        <Link to='/dashbord/myorders'>
            <ListItem button>
                <ListItemIcon>
                    <BusinessCenterIcon />
                </ListItemIcon>
                <ListItemText primary="My orders" />
            </ListItem>
        </Link>

        <Link to='/dashbord/myfinishedorders'>
            <ListItem button>
                <ListItemIcon>
                    <BookmarksIcon />
                </ListItemIcon>
                <ListItemText primary="Finished orders" />
            </ListItem>
        </Link>

        <Link to='/dashbord/mypaiedorders'>
            <ListItem button>
                <ListItemIcon>
                    <CloudDoneIcon />
                </ListItemIcon>
                <ListItemText primary="Paied orders" />
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