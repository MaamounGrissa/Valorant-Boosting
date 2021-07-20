import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MessageBox from '../MessageBox.js';
import { AddBooster, EditBooster } from '../../../actions/userActions.js';

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

export default function AddUser(props) {

    const { user } = props;
    const boosterEdit = useSelector((state) => state.boosterEdit);
    const { loading } = boosterEdit;
    const classes = useStyles();
    const dispatch = useDispatch()
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [rule, setRule] = useState(null);
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

        if (user) {

            if(password !== confirmPassword) {
                setErrors('Confirm Password Error !');
                return;
            }

            dispatch(EditBooster(user._id, email || null, name || null , password || null, null, null, null, rule || null)).then(() => {
                setMyfeedback('User updated !')
            });
            
        } else {
            if (!password || password === '' || password.length < 8 ) {
                setErrors('Password lenght less than 8 !');
                return;
            }
    
            if(password !== confirmPassword) {
                setErrors('Confirm Password Error !');
                return;
            }
    
            dispatch(AddBooster(name, email, password, null, null, null, rule)).then(() => {
                setMyfeedback('New User added');
                setName(null);
                setEmail(null);
                setPassword(null);
                setConfirmPassword(null);
                setRule(null);
            });
        }
    }

  
    if (props.showAddUser) {
        return (
            <div className="modal-container show">
                <div className="modal-box">
                    <div className="modal-content">
                        <div className="modal-header">
                                <h2>{user ? 'Edit ' : 'Add '} User</h2>
                                <button id="close-modal" onClick={props.onClose} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                        </div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <div className="form-center">
                                    <form  className={classes.root} noValidate autoComplete="off">
                                        
                                        <TextField type="text" label="Name" variant="outlined" 
                                            onChange={e => handleName(e)} 
                                            value={name || user?.name} />
                                        
                                        <TextField type="email" label="Email" variant="outlined" 
                                            onChange={e => handleEmail(e)} 
                                            value={email || user?.email}  />
            
                                        <TextField type="password" label="Password" variant="outlined" 
                                            onChange={e => handlePassword(e)} 
                                            value={password} />
            
                                        <TextField type="password" label="Confirm New Password" variant="outlined" 
                                            onChange={e => handleConfirmPassword(e)} 
                                            value={confirmPassword} />
                                    
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="rules-select">User Type</InputLabel>
                                            <Select
                                            native
                                            value={rule || user?.rule}
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
                                        startIcon={<SaveIcon />}
                                        onClick={submitEdit}>
                                        {
                                            user ? 'Edit  ' : 'Add  '
                                        }
                                        {
                                            loading ? (
                                                <img src="/images/loading-buffering.gif" width='20' alt="Loading" />
                                        ) : ( '' )
                                        }
                                        
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
                    </div>
                </div>
        </div>)
    } else {
        return null
    }
        
}
