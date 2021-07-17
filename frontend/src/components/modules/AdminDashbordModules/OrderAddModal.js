import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, Slider, Switch, TextField, withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MessageBox from '../MessageBox.js';
import SaveIcon from '@material-ui/icons/Save';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import VideocamIcon from '@material-ui/icons/Videocam';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import { AddOrder } from '../../../actions/orderActions';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
}));

const OrangeSwitch = withStyles({
    switchBase: {
      color: '#ff9155',
      '&$checked': {
        color: '#ff9155',
      },
      '&$checked + $track': {
        backgroundColor: '#ff9155',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const PrettoSlider = withStyles({
    root: {
      color: '#ff9155',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

export default function OrderAddModal(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const orderAdd = useSelector((state) => state.orderAdd);
    const { loading } = orderAdd;

    const [user, setUser] = useState('');
    const [duoGame, setDuoGame] = useState(false);
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [summoner, setSummoner] = useState('');
    const [boostType, setBoostType] = useState('Rank Boosting')
    const [startRank, setStartRank] = useState(0);
    const [startDivision, setStartDivision] = useState(0);
    const [rankRating, setRankRating] = useState(0);
    const [server, setServer] = useState('');
    const [desiredRank, setDesiredRank] = useState(0);
    const [desiredDivision, setDesiredDivision] = useState(0);
    const [games, setGames] = useState(5);
    const [price, setPrice] = useState(0);
    const [chatOffline, setChatOffline] = useState(false);
    const [specificAgents, setSpecificAgents] = useState(false);
    const [priorityOrder, setPriorityOrder] = useState(false);
    const [withStreaming, setWithStreaming] = useState(false);
    const [myfeedback, setMyfeedback] = useState(null);
    const [errors, setErrors] = useState(null);

    const ranks = [
        "Iron",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Immortal"
    ];


    const handleUser = (e) => {
        e.preventDefault();
        setUser(e.target.value);
    }

    const handleGames = (e, newValue) => {
        setGames(newValue)
    }

    const handleBoostType = (e, type) => {
        e.preventDefault();
        setBoostType(type)
        if (type === 'Placement Boost') {
            setStartRank(0);
            setStartDivision(0);
            setRankRating(0);
        }
    }

    const handleStartRank = (e) => {
        e.preventDefault();
        if (desiredRank === 0) {
            setStartRank(e.target.value);
        } else {
            if (e.target.value <= desiredRank) {
                setStartRank(e.target.value);
            }
        }
        if (startRank === desiredRank && startDivision > 0 && desiredDivision > 0) {
            if (startDivision >= desiredDivision) {
                setDesiredDivision(startDivision + 1)
            }
        }
    }

    const handleDesiredRank = (e) => {
        e.preventDefault();
        if (boostType === 'Placement Boosting') {
            setDesiredRank(e.target.value);
        } else {
            if (boostType === 'Rank Boosting' && e.target.value >= startRank) {
                setDesiredRank(e.target.value);
            }
            if (boostType === 'Rank Boosting' && startRank === desiredRank && startDivision > 0 && desiredDivision > 0) {
                if (startDivision >= desiredDivision) {
                    setDesiredDivision(startDivision + 1);
                }
            }
        }
    }

    const handleStartDivision = (e) => {
        e.preventDefault();
        if (startRank === desiredRank) {
            if (desiredDivision > 0 && e.target.value < desiredDivision) {
                setStartDivision(e.target.value);
            }
        } else {
            setStartDivision(e.target.value);
        }
    }

    const handleDesiredDivision = (e) => {
        e.preventDefault();
        if (boostType === 'Rank Boosting' && startRank === desiredRank) {
            if (e.target.value > startDivision) {
                setDesiredDivision(e.target.value);
            }
        } else {
            setDesiredDivision(e.target.value);
        }
    }

    const calculatePrice = useCallback(() => {
        const MyVariable = parseFloat(props.setting?.find(s => s.name === 'division-price').value) || 10.3;
        const MyDiffCoef = parseFloat(props.setting?.find(s => s.name === 'difficulty-coef').value) || 1.4;
        let GeneratedPrice = 0;

        if (boostType === 'Rank Boosting') {
            for (let index = startRank; index <= desiredRank; index++) {
                let rankDificulty = index * MyDiffCoef;
                let rankRatingCalc = (((rankRating / 10) - 1) * rankDificulty) / 2;
    
                if (startRank === desiredRank) {
                    GeneratedPrice = ((MyVariable + rankDificulty) * (desiredDivision - startDivision)) - rankRatingCalc;
                } else {
                    if (index === startRank) {
                        GeneratedPrice += ((MyVariable + rankDificulty) * (3 - startDivision)) - rankRatingCalc ;
                    } else if (index === desiredRank) {
                        GeneratedPrice += (MyVariable + rankDificulty) * desiredDivision;
                    } else {
                        GeneratedPrice += (MyVariable + rankDificulty) * 3;
                    }
                    
                }
            }
    
        } else {
            for (let index = 1; index <= desiredRank; index++) {
                let rankDificulty = index * MyDiffCoef;
    
                if (desiredRank === 1) {
                    GeneratedPrice = ((MyVariable + rankDificulty) * desiredDivision);
                } else {
                    if (index === desiredRank) {
                        GeneratedPrice += ((MyVariable + rankDificulty) * (desiredDivision)) ;
                    } else {
                        GeneratedPrice += (MyVariable + rankDificulty) * 3;
                    }
                }
            }
        }

        let optionPrice = GeneratedPrice;
    
        if (duoGame) {
            optionPrice += ((GeneratedPrice / 100)  * 40);
        }
        if (priorityOrder) {
            optionPrice += ((GeneratedPrice / 100)  * 20);
        }
        if (withStreaming) {
            optionPrice += ((GeneratedPrice / 100)  * 20);
        }
        if (optionPrice > 0) {
            GeneratedPrice = optionPrice;
        }
        
        return GeneratedPrice.toFixed(2);
        
    }, [props.setting, boostType, duoGame, priorityOrder, withStreaming, startRank, desiredRank, rankRating, desiredDivision, startDivision]);


    const submitSave = (e) => {
        e.preventDefault();

        if (user === '') {
            setErrors('Select user !');
            return;
        }
        if (boostType === 'Rank Boosting' && startRank === '') {
            setErrors('Select your start rank !');
            return;
        }
        if (boostType === 'Rank Boosting' && startDivision === 0) {
            setErrors('Select your start division !');
            return;
        }
        if (desiredRank === 0) {
            setErrors('Select your desired rank !');
            return;
        }
        if (desiredDivision === 0) {
            setErrors('Select your desired division !');
            return;
        }
        if (server === '') {
            setErrors('Select your server !');
            return;
        }
        if (price === 0) {
            setErrors('Enter price !');
            return;
        }

        dispatch(AddOrder(
            user, 
            account, 
            password, 
            summoner, 
            server, 
            boostType, 
            startRank, 
            startDivision, 
            rankRating, 
            desiredRank, 
            desiredDivision, 
            games, 
            duoGame, 
            chatOffline, 
            specificAgents, 
            priorityOrder, 
            withStreaming, 
            price,
            )).then(() => {
                setMyfeedback('New Order added');
                setDuoGame(false);
                setAccount('');
                setPassword('');
                setSummoner('');
                setBoostType('Rank Boosting');
                setStartRank('');
                setStartDivision(0);
                setRankRating(0);
                setDesiredRank('');
                setDesiredDivision(0);
                setServer('');
                setGames(5);
                setChatOffline(false);
                setSpecificAgents(false);
                setPriorityOrder(false);
                setWithStreaming(false);
                setPrice(0);
                setUser('');
                props.onClose(e);
        });
    }

    useEffect(() => {
        if (user) {
            setAccount(props.accounts.find(acc => acc.userId === user)?.name || '');
            setPassword(props.accounts.find(acc => acc.userId === user)?.password || '');
            setSummoner(props.accounts.find(acc => acc.userId === user)?.summoner || '');
        }
        if (boostType === 'Rank Boosting' && startRank > 0 && desiredRank > 0 && startDivision > 0 && desiredDivision > 0 && rankRating > 0) {
            setPrice(calculatePrice);
        }

        if (boostType === 'Placement Boosting' && desiredRank > 0 && desiredDivision > 0 ) {
            setPrice(calculatePrice);
        }
    }, [boostType, calculatePrice, desiredDivision, desiredRank, props.accounts, rankRating, startDivision, startRank, user])


    if (props.showAddOrder) {
        return (
            <div className="modal-container show">
                <div className="modal-box">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add Order</h2>
                            <button id="close-modal" onClick={props.onClose} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-form">
                            <form  className="booster-add-form" noValidate autoComplete="off">
                                <div className="modal-form-single" title-data='User infos'>
                                    <FormControl className="booster-form-controle">
                                        <Select
                                        native
                                        value={user}
                                        onChange={e => handleUser(e)}
                                        inputProps={{
                                            name: 'client',
                                            id: 'client-select',
                                        }}
                                        >
                                        <option value={''}>Select user</option>
                                        {
                                            props.clients.map(client => 
                                                <option key={client._id} value={client._id}>{client.name} &nbsp; | &nbsp; {client.email}</option>
                                            )
                                        }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="modal-form-group" title-data='Valorant account infos'>
                                    <div className="switch-container">
                                        <OrangeSwitch className="group4-input"
                                            onChange={e => setDuoGame(!duoGame)}
                                            name="chat-offline"
                                        />
                                        <label className="switch-label"><PersonAddIcon /> Duo boost</label>
                                    </div>
                                    <TextField disabled={duoGame ? true : false} onChange={e => setAccount(e.target.value)} value={account} className="group4-input" type="text" label="Valorant account" variant="outlined"  />
                                    <TextField disabled={duoGame ? true : false}  onChange={e => setPassword(e.target.value)} value={password} className="group4-input" type="text" label="Account password" variant="outlined"  />
                                    <TextField disabled={duoGame ? true : false}  onChange={e => setSummoner(e.target.value)} value={summoner} className="group4-input" type="text" label="Summoner name" variant="outlined"  />
                                </div>
                                <div className="modal-form-group" title-data='Boost infos'>
                                    <FormControl className="group4-input">
                                        <Select
                                        native
                                        value={startRank}
                                        onChange={e => handleStartRank(e)}
                                        inputProps={{
                                            name: 'startrank',
                                            id: 'startrank-select',
                                        }}
                                        disabled={boostType === 'Rank Boosting' ? false : true}
                                        >
                                         <option value={''}>Start rank</option>
                                        {
                                            ranks.map((rank, index) => 
                                                <option key={index} value={index + 1}>{rank}</option>
                                            )
                                        }
                                        </Select>
                                    </FormControl>
                                    <FormControl className="group4-input">
                                        <Select
                                            native
                                            value={startDivision}
                                            onChange={e => handleStartDivision(e)}
                                            inputProps={{
                                                name: 'startdivision',
                                                id: 'startdivision-select',
                                            }}
                                            disabled={boostType === 'Rank Boosting' ? false : true}
                                        >
                                         <option value={0}>Start Division</option>
                                         <option value={1}>I</option>
                                         <option value={2}>II</option>
                                         <option value={3}>III</option>
                                        I
                                        </Select>
                                    </FormControl>
                                    <FormControl className="group4-input">
                                        <Select
                                            native
                                            value={rankRating}
                                            onChange={e => setRankRating(e.target.value)}
                                            inputProps={{
                                                name: 'rankRating',
                                                id: 'rankRating-select',
                                            }}
                                            disabled={boostType === 'Rank Boosting' ? false : true}
                                        >
                                            <option value={0}>Rating amount</option>
                                            <option value={10}>00 - 20</option>
                                            <option value={30}>21 - 40</option>
                                            <option value={50}>41 - 60</option>
                                            <option value={60}>61 - 80</option>
                                            <option value={90}>81 - 100</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl className="group4-input">
                                        <Select
                                            native
                                            value={server}
                                            onChange={e => setServer(e.target.value)}
                                            inputProps={{
                                                name: 'server',
                                                id: 'server-select',
                                            }}
                                        >
                                            <option value={''}>Select Server</option>
                                            <option value={'EUW'}>EUW</option>
                                            <option value={'EUNE'}>EUNE</option>
                                            <option value={'NA'}>NA</option>
                                            <option value={'OCE'}>OCE</option>
                                            <option value={'TR'}>TR</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl className="group4-input">
                                        <Select
                                        native
                                        value={desiredRank}
                                        onChange={e => handleDesiredRank(e)}
                                        inputProps={{
                                            name: 'desiredrank',
                                            id: 'desiredrank-select',
                                        }}
                                        >
                                         <option value={''}>Desired rank</option>
                                        {
                                            ranks.map((rank, index) => 
                                                <option key={index} value={index + 1}>{rank}</option>
                                            )
                                        }
                                        </Select>
                                    </FormControl>
                                    <FormControl className="group4-input">
                                        <Select
                                            native
                                            value={desiredDivision}
                                            onChange={e => handleDesiredDivision(e)}
                                            inputProps={{
                                                name: 'desireddivision',
                                                id: 'desireddivision-select',
                                            }}
                                        >
                                         <option value={0}>Desired Division</option>
                                         <option value={1}>I</option>
                                         <option value={2}>II</option>
                                         <option value={3}>III</option>
                                        I
                                        </Select>
                                    </FormControl>
                                    <div className="games-slider-input">
                                        <div className={classes.margin} />
                                        <Typography gutterBottom>Games</Typography>
                                        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" 
                                        step={1}
                                        min={1}
                                        max={5} 
                                        value={games} 
                                        onChange={handleGames} 
                                        disabled={boostType === 'Placement Boosting' ? false : true}
                                        />
                                        <div className={classes.margin} />
                                    </div>

                                    <TextField onChange={e => setPrice(e.target.value)} 
                                        value={price} 
                                        className="group4-input" type="text" label="Price" variant="outlined"  />

                                    <div className="switch-container">
                                        <OrangeSwitch
                                            onChange={e => setChatOffline(!chatOffline)}
                                            name="chat-offline"
                                            disabled={duoGame ? true : false}
                                        />
                                        <label className="switch-label"><SpeakerNotesOffIcon /> Offline on chat</label>
                                    </div>

                                    <div className="switch-container group4-input">
                                        <OrangeSwitch
                                            onChange={e => setSpecificAgents(!specificAgents)}
                                            name="specific-agents"
                                            disabled={duoGame ? true : false}
                                        />
                                        <label className="switch-label"><PeopleIcon /> Specific agents</label>
                                    </div>

                                    <div className="switch-container group4-input">
                                        <OrangeSwitch
                                            onChange={e => setPriorityOrder(!priorityOrder)}
                                            name="priority-order"
                                        />
                                        <label className="switch-label"><FlashOnIcon /> Priority order</label>
                                    </div>

                                    <div className="switch-container group4-input">
                                        <OrangeSwitch
                                            onChange={e => setWithStreaming(!withStreaming)}
                                            name="with-streaming"
                                            disabled={duoGame ? true : false}
                                        />
                                        <label className="switch-label"><VideocamIcon /> With Streaming</label>
                                    </div>
                                    <div className="order-type">
                                        <button className={boostType === 'Rank Boosting' ? 'active' : ''} onClick={e => handleBoostType(e, 'Rank Boosting')}>Rank Boost</button>
                                        <button className={boostType === 'Placement Boosting' ? 'active' : ''} onClick={e => handleBoostType(e, 'Placement Boosting')}>Placement Boosting</button>
                                    </div>
                                </div>

                                
                                <div className="form-center">
                                    <Button variant="contained"
                                                color="primary"
                                                className="mybtn"
                                                startIcon={<SaveIcon />}
                                                onClick={e => submitSave(e)}>
                                                Save&nbsp;&nbsp;
                                                {
                                                loading ? (
                                                        <img src="/images/loading-buffering.gif" width='20' alt="Loading" />
                                                ) : ( '' )
                                                }
                                        </Button>
                                        {
                                            myfeedback ? (
                                                <MessageBox>{myfeedback}</MessageBox>
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
