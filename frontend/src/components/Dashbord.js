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
import BoosterMenuListItems from './modules/BoosterDashbordModules/BoosterMenuListItems';
import ClientMenuListItems from './modules/ClientDashboadModules/ClientMenuListItems.js';
import ClientHome from './modules/ClientDashboadModules/ClientHome.js';
import LoadingBox from './modules/LoadingBox.js';
import ErrorPage from './modules/ErrorPage.js';
import ProfileTab from './modules/ProfileTab.js';
import PaiedOrders from './modules/AdminDashbordModules/PaiedOrders.js';
import AdminHome from './modules/AdminDashbordModules/AdminHome.js';
import BoosterHome from './modules/BoosterDashbordModules/BoosterHome.js';
import MyOrders from './modules/BoosterDashbordModules/MyOrders.js';
import BoosterFinishedOrders from './modules/BoosterDashbordModules/BoosterFinishedOrders.js';
import BoosterPaiedOrders from './modules/BoosterDashbordModules/BoosterPaiedOrders.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Valorant Boosting
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
    color: '#333',
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
    minHeight: '120vh'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    background: '#fff9f8',
    height: 350,
  },
  fixedHeight: {
    height: 350,
  },
}));

export default function Dashbord() {

    const classes = useStyles();  
    const [open, setOpen] = useState(false);

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
        localStorage.setItem('myId', userInfo._id)
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
                    {userInfo?.rule === 'admin' ? 'Admin ' : userInfo?.rule === 'booster' ? 'Booster ' : ''}Dashboard
                  </Typography>
                  <Link to='/' className='white' ><img src="/images/logo.png" alt="Logo" className="logo-style" /></Link>
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
                      <BoosterMenuListItems />
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
                         <React.Fragment>
                            <Route path="/dashbord" exact={true} render={ (props) =>
                              <AdminHome fixedHeightPaper={fixedHeightPaper} classes={classes} />
                            }/>
                            <Route path="/dashbord/paiedorders" exact={true} render={ (props) =>
                              <PaiedOrders />
                            }/>
                            <Route path="/dashbord/profile" exact={true} render={ (props) =>
                                <ProfileTab />
                            }/>
                          </React.Fragment>
                            
                        ) : userInfo?.rule === 'booster' ? (
                          <React.Fragment>
                            <Route path="/dashbord" exact={true} render={ (props) =>
                              <BoosterHome fixedHeightPaper={fixedHeightPaper} classes={classes} />
                            }/>
                            <Route path="/dashbord/myorders" exact={true} render={ (props) =>
                              <MyOrders classes={classes} />
                            }/>
                            <Route path="/dashbord/myfinishedorders" exact={true} render={ (props) =>
                              <BoosterFinishedOrders classes={classes} />
                            }/>
                            <Route path="/dashbord/mypaiedorders" exact={true} render={ (props) =>
                              <BoosterPaiedOrders classes={classes} />
                            }/>
                            <Route path="/dashbord/profile" exact={true} render={ (props) =>
                                <ProfileTab />
                            }/>
                          </React.Fragment>
                        ) : userInfo?.rule === 'client' ? (
                          <React.Fragment>
                            <Route path="/dashbord" exact={true} render={ (props) =>
                                <ClientHome fixedHeightPaper={fixedHeightPaper} classes={classes} userInfo={userInfo} />
                              }/>
                              <Route path="/dashbord/profile" exact={true} render={ (props) =>
                                <ProfileTab />
                            }/>
                          </React.Fragment>
                            
                        ): ('')
                      }
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