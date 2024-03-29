import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { EditBooster } from '../../../actions/userActions';
import Button from '@material-ui/core/Button';
import MessageBox from '../MessageBox.js';
import SaveIcon from '@material-ui/icons/Save';

export default function BoosterEditModal(props) {
    const { booster } = props;
    const boosterEdit = useSelector((state) => state.boosterEdit);
    const { loading, feedback } = boosterEdit;
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rank, setRank] = useState('');
    const [paypal, setPaypal] = useState('');
    const [percentage, setPercentage] = useState('')
    const [errors, setErrors] = useState(null);

    const submitSave = (e) => {
        e.preventDefault();

        if (password !== '' && password.length < 8 ) {
            setErrors('Password lenght less than 8 !');
            return;
        }

        if(password !== confirmPassword) {
            setErrors('Confirm Password Error !');
            return;
        }

        dispatch(EditBooster(booster._id, email, name, password, rank, paypal, percentage));
    }

    useEffect(() => {
        if (props.showEditBooster) {
            setEmail(booster.email);
            setName(booster.name);
            setRank(booster.rank);
            setPaypal(booster.paypal);
            setPercentage(booster.percentage);
        }
    }, [props.showEditBooster, booster]);

    if (props.showEditBooster) {
        
        return (
            <div className="modal-container show">
                <div className="modal-box">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Edit Booster</h2>
                            <button id="close-modal" onClick={props.onClose} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-form">
                            <form  className="booster-add-form" noValidate autoComplete="off">
                                <div className="booster-group">
                                    <TextField onChange={e => setName(e.target.value)} value={name} className="booster-input middle" type="text" label="Name" variant="outlined" autoComplete="off" />
                                    <TextField onChange={e => setPassword(e.target.value)} value={password} className="booster-input middle" type="password" label="New Password" variant="outlined" autoComplete="off" />
                                </div>
                                <div className="booster-group">
                                    <TextField onChange={e => setEmail(e.target.value)} value={email} className="booster-input middle" type="email" label="Email" variant="outlined"   />
                                    <TextField onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} className="booster-input middle" type="password" label="Confirm New Password" variant="outlined" />
                                </div>
                                <FormControl className="booster-form-controle">
                                    <InputLabel htmlFor="rank-select">Rank</InputLabel>
                                    <Select
                                    native
                                    value={rank}
                                    onChange={e => setRank(e.target.value)}
                                    inputProps={{
                                        name: 'rank',
                                        id: 'rank-select',
                                    }}
                                    >
                                    <option value={'Challenger I'}>Challenger I</option>
                                    <option value={'Master I'}>Master I</option>
                                    <option value={'Diamond I'}>Diamond I</option>
                                    <option value={'Diamond II'}>Diamond II</option>
                                    <option value={'Diamond III'}>Diamond III</option>
                                    <option value={'Diamond IV'}>Diamond IV</option>
                                    <option value={'Diamond V'}>Diamond V</option>

                                    </Select>
                                </FormControl>
                                <TextField onChange={e => setPaypal(e.target.value)} value={paypal} className="booster-input" type="email" label="Paypal Email" variant="outlined"  />
                                <TextField onChange={e => setPercentage(e.target.value)} value={percentage} className="booster-input" type="number" label="Percentage" variant="outlined"  />
                                <div className="form-center">
                                    <Button variant="contained"
                                                color="primary"
                                                className="mybtn"
                                                startIcon={<SaveIcon />}
                                                onClick={submitSave}>
                                                Save&nbsp;&nbsp;
                                                {
                                                loading ? (
                                                    <img src="/images/loading-buffering.gif" width='20px' alt="Loading" />
                                                ) : ( '' )
                                                }
                                        </Button>
                                        {
                                            feedback ? (
                                                <MessageBox>{feedback}</MessageBox>
                                            ) : errors ? (
                                                <MessageBox variant='danger'>{errors}</MessageBox>
                                            ) : ( '' )
                                        }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else { return null }
}
