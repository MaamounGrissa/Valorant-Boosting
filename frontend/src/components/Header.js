import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { signout } from '../actions/userActions';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FaceIcon from '@material-ui/icons/Face';

export default function Header(props) {

    const { userInfo } = props;

    const dispatch = useDispatch();

    const signoutHandler = (e) => {
        e.preventDefault();
        dispatch(signout());
    }

    return (
        <header id="header">
            <div id="topbar" className="topbar"> 
              <nav className="topnav">
                <ul>
                  <div className="social-media-container">
                    <Link to="https://twitter.com/?lang=en" target="_blank"><TwitterIcon className="social-icon" style={{ fontSize: '25px' }} /></Link>
                    <Link to="https://facebook.com/" target="_blank"><FacebookIcon className="social-icon" style={{ fontSize: '25px' }} /></Link>
                    <Link to="https://instagram.com/" target="_blank"><InstagramIcon className="social-icon" style={{ fontSize: '25px' }} /></Link>
                  </div>
                  {
                  userInfo ? (
                        <li className="setting">
                          <Link to="/dashbord">
                            <SettingsIcon style={{ fontSize: '25px' }} /><span>Dashbord</span>
                          </Link>
                          <Link to="#signout" onClick={e => signoutHandler(e)}>
                            <ExitToAppIcon style={{ fontSize: '25px' }} /><span>Logout</span>
                          </Link>
                        </li>
                    ) :
                    (
                      <li className="setting">
                        <Link to="/signin">
                          <FaceIcon style={{ fontSize: '80px' }} /><span>Login</span>
                        </Link>
                        <Link to="/register">
                          <PersonAddIcon style={{ fontSize: '80px' }} /><span>Register</span>
                        </Link>
                      </li>
                    )
                }
                </ul>
              </nav>
            </div>
            <div className="navigation">
              <Link to="/">
                <div className="logo-container">
                      <img src="/images/logo.png" alt="App Logo" />
                      <h1>Valorant Boosting</h1>
                </div>
              </Link>
              <nav className="menu-container">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/blog">FAQ</a></li>
                  <li><a href="/home">Contact</a></li>
                </ul>
              </nav>
              <button className="mobile-menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </header>
    )
}
