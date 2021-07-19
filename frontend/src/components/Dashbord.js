import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
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
import OrdersHistroy from './modules/ClientDashboadModules/OrdersHistroy.js';
import CompletedOrders from './modules/BoosterDashbordModules/CompletedOrders.js';
import SettingsIcon from '@material-ui/icons/Settings';
import { ListSetting } from '../actions/settingActions.js';
import EditIcon from '@material-ui/icons/Edit';
import SettingEdit from './modules/SettingEdit.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Valorant Boosting
      {' '}
      {new Date().getFullYear()}
      {'. Created by Maamoun Grissa'}
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
    minHeight: '115vh'
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
  table: {
    minWidth: '100%',
  }
}));

export default function Dashbord() {

    const dispatch = useDispatch();
    const classes = useStyles();  
    const [open, setOpen] = useState(false);
    const [showSetting, setShowSetting] = useState(false);

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const settingList = useSelector((state) => state.settingList);
    const { setting } = settingList;

    const [selectedSetting, setSelectedSetting] = useState(false);
    const [showEditSetting, setShowEditSetting] = useState(false);
    const [theme, setTheme] = useState(true);

    const ranks = [
      "Unranked",
      "Iron",
      "Bronze",
      "Silver",
      "Gold",
      "Platinum",
      "Diamond",
      "Immortal",
      "Radiant",
    ];

    const divisions = [
      "Nothing",
      "I",
      "II",
      'III',
    ];

    const handleSelectSetting = (e, selected) => {
      e.preventDefault();
      setSelectedSetting(selected);
      setShowEditSetting(true);
    }

    const handleSavedSetting = () => {
      dispatch(ListSetting());
      setSelectedSetting(null);
      setShowEditSetting(false);
    }
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
      if (userInfo && userInfo.rule === 'admin') {
        dispatch(ListSetting());
      }
    }, [dispatch, userInfo])

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    if(loading) {
        return <LoadingBox />
    } else if (error){
        return <ErrorPage msg="Login to have access to dashbord" />
    } else {
        localStorage.setItem('myId', userInfo._id);
        const rankBoostingPrices = setting?.filter(s => s.games === 0 && s.win === 0);
        const placementBoostingPrices = setting?.filter(s => s.games > 0);
        const winBoostingPrices = setting?.filter(s => s.win > 0);
        
        return (
            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} data={theme && userInfo.rule === 'client' ? 'client' : 'others'}>
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
                  <div className="flex-align-center">
                    <Link to='/' className='white' ><img src="/images/logo.png" alt="Logo" className="logo-style" /></Link>
                    {
                      userInfo.rule === 'client' ? (
                        <div className="flex-align-center">
                          <WbSunnyIcon />
                          <label className="switch">
                            <input type="checkbox" checked={theme} onChange={e =>  setTheme(!theme)} />
                            <span className="slider round"></span>
                          </label>
                          <Brightness2Icon />
                        </div>
                      ) : userInfo.rule === 'admin' ? (
                          <SettingsIcon id="setting-button" onClick={e => setShowSetting(!showSetting)} />
                      ) : ( '' )
                    }
                  </div>
                  
                </Toolbar>
              </AppBar>
              <Drawer data={theme && userInfo.rule === 'client' ? 'clientDrawer' : 'others'}
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
              <main className={classes.content} data={theme && userInfo.rule === 'client' ? 'client' : 'others'}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
        
                    { /* TAB CONTENT */ }
                    <Switch>
                      {
                        userInfo?.rule === 'admin' ? (
                         <React.Fragment>
                            <Route path="/dashbord" exact={true} render={ (props) =>
                              <AdminHome fixedHeightPaper={fixedHeightPaper} classes={classes} setting={setting} />
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
                            <Route path="/dashbord/completedorders" exact={true} render={ (props) =>
                              <CompletedOrders classes={classes} />
                            }/>
                            <Route path="/dashbord/profile" exact={true} render={ (props) =>
                                <ProfileTab />
                            }/>
                          </React.Fragment>
                        ) : userInfo?.rule === 'client' ? (
                          <React.Fragment>
                            <Route path="/dashbord" exact={true} render={ (props) =>
                                <ClientHome fixedHeightPaper={fixedHeightPaper} classes={classes} userInfo={userInfo} theme={theme} />
                              }/>
                              <Route path="/dashbord/profile" exact={true} render={ (props) =>
                                <ProfileTab theme={theme} />
                              }/>
                              <Route path="/dashbord/history" exact={true} render={ (props) =>
                                <OrdersHistroy classes={classes} theme={theme} />
                              }/>
                          </React.Fragment>
                            
                        ): ('')
                      }
                        </Switch>
                 
                  <Box pt={4} className={theme && userInfo.rule === 'client' ? 'client-footer' : ''}>
                    <Copyright />
                  </Box>

                  {
                    userInfo.rule === 'admin' ? (
                      <div>
                        <div className={!showSetting ? "setting-container" : "setting-container show"}>
                          <div className="flex-center-between">
                            <h3>SETTINGS</h3>
                          </div>
                          <h5>Rank boosting prices</h5>
                          {
                            rankBoostingPrices?.map((mySetting) =>
                              <div key={mySetting._id} className="flex-align-center">
                                <label>
                                  {ranks[mySetting.rank] + ' ' + 
                                  divisions[mySetting.division] + ' => ' + 
                                  ranks[mySetting.desiredRank] + ' ' + 
                                  divisions[mySetting.desiredDivision]}
                                </label>
                                <div className="setting-amount">
                                  <label>{mySetting.amount}</label>
                                  <EditIcon onClick={e => handleSelectSetting(e, mySetting)} />
                                </div>
                              </div>
                            )
                          }
                          <h5>Placement boosting prices</h5>
                          {
                            placementBoostingPrices?.map((mySetting) =>
                              <div key={mySetting._id} className="flex-align-center">
                                <label>
                                  {ranks[mySetting.desiredRank] + ' '}
                                </label>
                                <div className="setting-amount">
                                  <label>{mySetting.amount}</label>
                                  <EditIcon onClick={e => handleSelectSetting(e, mySetting)} />
                                </div>
                              </div>
                            )
                          }
                          <h5>Win boosting prices</h5>
                          {
                            winBoostingPrices?.map((mySetting) =>
                              <div key={mySetting._id} className="flex-align-center">
                                <label>
                                  {ranks[mySetting.desiredRank] + ' '}
                                </label>
                                <div className="setting-amount">
                                  <label>{mySetting.amount}</label>
                                  <EditIcon onClick={e => handleSelectSetting(e, mySetting)} />
                                </div>
                              </div>
                            )
                          }
                        </div>
                        <SettingEdit showEditSetting={showEditSetting} selectedSetting={selectedSetting} onClose={handleSavedSetting} />
                      </div>
                    ) : ( '' )
                  }
                </Container>
              </main>
            </div>
          );
    }

  
}