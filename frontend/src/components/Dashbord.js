import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AdminMenuListItems from './modules/AdminDashbordModules/AdminMenuListItems.js';
import ClientMenuListItems from './modules/ClientDashboadModules/ClientMenuListItems.js';
import HomeTab from './modules/ClientDashboadModules/HomeTab.js';
import LoadingBox from './modules/LoadingBox.js';
import ErrorPage from './modules/ErrorPage.js';
import ProfileTab from './modules/ProfileTab.js';
import AddUser from './modules/AdminDashbordModules/AddUser.js';
import ListUsers from './modules/AdminDashbordModules/ListUsers.js';
import AdminHome from './modules/AdminDashbordModules/AdminHome.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Your Website
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    zIndex: '888',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#fafafa',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    color: '#000',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    position: 'relative',
    minHeight: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    background: '#fff9f8',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashbord() {

    const classes = useStyles();  
    const [open, setOpen] = useState(true);

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    if(loading) {
        return <LoadingBox />
    } else if (error){
        return <ErrorPage msg="Login to have access to dashbord" />
    } else {
        return (
            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Dashboard
                  </Typography>
                  <Link to='/' className='white' >Valorant Boosting</Link>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
              >
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                { 
                  userInfo?.rule === 'client' ? (
                      <ClientMenuListItems />
                  ) : userInfo?.rule === 'booster' ? (
                    'Your are Booster'
                  ) : userInfo?.rule === 'admin' ? (
                      <AdminMenuListItems />
                  ) : ('Permission Error')
                }
              </Drawer>
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
        
                    { /* TAB CONTENT */ }
                    <Switch>
                      {
                        userInfo?.rule === 'admin' ? (
                            <Route path="/dashbord" exact={true} render={ (props) =>
                              <AdminHome fixedHeightPaper={fixedHeightPaper} classes={classes} />
                            }/>
                        ) : userInfo?.rule === 'booster' ? (
                          ''
                        ) : userInfo?.rule === 'client' ? (
                            <Route path="/dashbord" exact={true} render={ (props) =>
                              <HomeTab fixedHeightPaper={fixedHeightPaper} classes={classes} />
                            }/>
                        ): ('')
                      }

                        <Route path="/dashbord/profile" exact={true} render={ (props) =>
                            <ProfileTab />
                        }/>

                        <Route path="/dashbord/adduser" exact={true} render={ (props) =>
                            <AddUser />
                        }/>

                        <Route path="/dashbord/listusers" exact={true} render={ (props) =>
                            <ListUsers />
                        }/>

                        </Switch>
                 
                  <Box pt={4}>
                    <Copyright />
                  </Box>
                </Container>
              </main>
            </div>
          );
    }

  
}