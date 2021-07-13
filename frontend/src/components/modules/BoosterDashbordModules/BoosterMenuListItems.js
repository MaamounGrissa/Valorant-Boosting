import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

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

        <Link to='/dashbord/finishedorders'>
            <ListItem button>
                <ListItemIcon>
                    <BookmarksIcon />
                </ListItemIcon>
                <ListItemText primary="My Finished orders" />
            </ListItem>
        </Link>

        <Link to='/dashbord/paiedorders'>
            <ListItem button>
                <ListItemIcon>
                    <CloudDoneIcon />
                </ListItemIcon>
                <ListItemText primary="My Paied orders" />
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