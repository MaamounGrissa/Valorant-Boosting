import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Title from '../Title.js';
import MessageBox from '../MessageBox.js';
import LoadingBox from '../LoadingBox.js';
import ErrorPage from '../ErrorPage.js';
import { register } from '../../../actions/userActions.js';

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

export default function AddUser() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const classes = useStyles();
    const dispatch = useDispatch()
    const [name, setName] = useState(userInfo.name);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rule, setRule] = useState('booster');
    const [myfeedback, setMyfeedback] = useState(null);
    const [errors, setErrors] = useState(null);
    
    const handleRule = (event) => {
        setRule(event.target.value)
    };

    const handleName = (event) => {
        setName(event.target.value)
    };

    const handleEmail = (event) => {
        setEmail(event.target.value)
    };

    const handlePassword = (event) => {
        setPassword(event.target.value)
    };

    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    };

    const submitEdit = (e) => {
        e.preventDefault();

        if (!password || password === '' || password.length < 8 ) {
            setErrors('Password lenght less than 8 !');
            return;
        }

        if(password !== confirmPassword) {
            setErrors('Confirm Password Error !');
            return;
        }

        dispatch(register(name, email, password, rule)).then(() => {
            setMyfeedback('New Booster added');
            setName('');
            setEmail('');
            setPassword(null);
            setConfirmPassword('');
        });
    }

    if(loading) {
        return <LoadingBox />
    } else if (error){
        return <ErrorPage msg="Login to have access to dashbord" />
    } else {
        if (userInfo.rule === 'admin') {
               return (<div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <div className="form-center">
                                <form  className={classes.root} noValidate autoComplete="off">
                                    <div className='table-header-container'>
                                        <Title>Add User</Title>
                                    </div>
                                    
                                    <TextField type="text" label="Name" variant="outlined" onChange={e => handleName(e)} value={name} />
                                    
                                    <TextField type="email" label="Email" variant="outlined" onChange={e => handleEmail(e)} value={email}  />
        
                                    <TextField type="password" label="Password" variant="outlined" onChange={e => handlePassword(e)} value={password} />
        
                                    <TextField type="password" label="Confirm New Password" variant="outlined" onChange={e => handleConfirmPassword(e)} value={confirmPassword} />
                                
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="rules-select">User Type</InputLabel>
                                        <Select
                                        native
                                        value={rule}
                                        onChange={e => handleRule(e)}
                                        inputProps={{
                                            name: 'rules',
                                            id: 'rules-select',
                                        }}
                                        >
                                        <option value={'booster'}>Booster</option>
                                        <option value={'client'}>Customer</option>
                                        <option value={'admin'}>Admin</option>
                                        </Select>
                                    </FormControl>
                                
                                </form>
                            </div>
                        </Grid>           
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                    <div className="form-center">
                        <Button variant="contained"
                                    color="primary"
                                    className="mybtn"
                                    startIcon={<AddCircleIcon />}
                                    onClick={submitEdit}>
                                    Add&nbsp;&nbsp;
                            </Button>
                            {
                                myfeedback && myfeedback !== '' ? (
                                    <MessageBox>{myfeedback}</MessageBox>
                                ) : errors ? (
                                    <MessageBox variant='danger'>{errors}</MessageBox>
                                ) : ( '' )
                            }
                    </div>
                    </Grid>
                </Grid>
            </div>)
      } else {
          return <ErrorPage msg='You dont have permission to access to this page' />
       }
        
    }
}
