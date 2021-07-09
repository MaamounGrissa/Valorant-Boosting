import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Title from './Title';
import MessageBox from './MessageBox';
import SaveIcon from '@material-ui/icons/Save';
import { EditUser } from '../../actions/userActions';
import LoadingBox from './LoadingBox';
import ErrorPage from './ErrorPage';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
    inputUpload: {
        display: 'none',
    },
  },
}));

export default function ProfileTab() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const [errors, setErrors] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch()
    const userEdit = useSelector( state => state.userEdit);
    const {loadingEdit, errorEdit, feedbackEdit} = userEdit;
    const [name, setName] = useState(userInfo.name);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [photo, setPhoto] = useState(null);
       
    const handleName = (event) => {
        setName(event.target.value)
    };

    const handlePassword = (event) => {
        setPassword(event.target.value)
    };

    const handleNewPassword = (event) => {
        setNewPassword(event.target.value)
    };

    const handleConfirmNewPassword = (event) => {
        setConfirmNewPassword(event.target.value)
    };

    const handlePhoto = (event) => {
        setPhoto(event.target.files[0])
    }

    const submitEdit = (e) => {
        e.preventDefault();

        if (!password ) {
            setErrors('Enter your old password');
            return;
        }

        if(newPassword && newPassword !== '' && newPassword !== confirmNewPassword) {
            setErrors('Confirm Password Error');
            return;
        }

        const formData = new FormData();
        formData.append('id', userInfo._id);
        formData.append('name', name);
        photo ? formData.append('photo', photo) : formData.append('photo', userInfo.photo);
        formData.append('password', password);
        formData.append('newPassword', newPassword);

        dispatch(EditUser(formData)).then(() => {
            window.location.reload();
        });
    }

    if(loading) {
        return <LoadingBox />
    } else if (error){
        return <ErrorPage msg="Login to have access to dashbord" />
    } else {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <form className={classes.root} noValidate autoComplete="off">

                            <div className='table-header-container'>
                                <Title>Edit Profile</Title>
                            </div>
                            
                            <TextField type="text" label="Name" variant="outlined" onChange={e => handleName(e)} value={name} />
                            
                            <TextField type="text" label="Email" variant="outlined"  value={userInfo.email} InputProps={{readOnly: true}} />

                            <TextField type="password" label="Old Password" variant="outlined" onChange={e => handlePassword(e)} value={password} />

                            <TextField type="password" label="New Password" variant="outlined" onChange={e => handleNewPassword(e)} value={newPassword} />

                            <TextField type="password" label="Confirm New Password" variant="outlined" onChange={e => handleConfirmNewPassword(e)} value={confirmNewPassword} />
                            
                        
                        </form>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <div className='admin-image-container'>
                        {
                            photo ? (
                                <img src={URL.createObjectURL(photo)} alt='Add' className='image-display' />
                            ) : userInfo.photo === '' ? (
                                <img src='/images/add-image.png' alt='Add' className='add-image' />
                            ) : (
                                <img src={userInfo.photo} alt='profile' className='image-display' />
                            ) 
                        }
                        </div>
                        <div className='select-image'>
                            <input
                                accept="image/*"
                                className='input-upload'
                                id="select-image-input"
                                type="file"
                                onChange={e => handlePhoto(e)}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<CloudUploadIcon />}
                                        onClick={() => {document.getElementById('select-image-input').click()}}
                                >
                                Profile Photo
                                </Button>
                            </label>
                        </div>
                    </Grid>            
            </Grid>
            <Grid container spacing={3} >
                <Grid item xs={12} md={6} lg={6}>
                    <Button variant="contained"
                                color="primary"
                                className="mybtn"
                                startIcon={<SaveIcon />}
                                onClick={submitEdit}>
                                Save&nbsp;&nbsp;
                                {
                                    loadingEdit && (
                                        <img src="/images/loading-buffering.gif" width='20' alt="Loading" />
                                    )
                                }
                        </Button>
                        {
                            feedbackEdit && feedbackEdit[1] ? (
                                <MessageBox variant={feedbackEdit[0] ? 'info' : 'danger'}>{feedbackEdit[1]}</MessageBox>
                            ) : errorEdit ? (
                                <MessageBox variant='danger'>{errorEdit}</MessageBox>
                            ) : errors ? (
                                <MessageBox variant='danger'>{errors}</MessageBox>
                            ) : ( '' )
                        }
                </Grid>
            </Grid>
        </div>
        )
    }
}
