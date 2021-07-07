import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
}));

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

export default function PlacementTab() {
    const classes = useStyles();

    const [selectedImage, setSelectedImage] = useState('');
    const [rank, setRank] = useState(null);
    const [division, setDivision] = useState(null);
    
    const [games, setGames] = useState(5);
    const [server, setServer] = useState(20);

    const [chatOffline, setChatOffline] = useState(false);
    const [specificAgents, setSpecificAgents] = useState(false);
    const [playWithBooster, setPlayWithBooster] = useState(false);
    const [priorityOrder, setPriorityOrder] = useState(false);
    const [withStreaming, setWithStreaming] = useState(false);

    const [price, setPrice] = useState(0);
    const [time, setTime] = useState('0-1');
    const [feedback, setFeedback] = useState(null);

    const handleRank = (e, selected, imageLink) => {
        e.preventDefault();
        setRank(selected)
        setSelectedImage(imageLink)
    }

    const handleDivision = (e, selected) => {
        e.preventDefault();
        setDivision(selected)
    }

    const handleGames = (e) => {
        e.preventDefault();
        setGames(e.target.value)
    }

    const handleServer = (e, details) => {
        e.preventDefault();
        setServer(e.target.value);
    }

    const handleChatOffline = (e) => {
        e.preventDefault();
        setChatOffline(!chatOffline);
    }

    const handleSpecificAgents = (e) => {
        e.preventDefault();
        setSpecificAgents(!specificAgents);
    }

    const handlePlayWithBooster = (e) => {
        e.preventDefault();
        setPlayWithBooster(!playWithBooster);
    }

    const handlePriorityOrder = (e) => {
        e.preventDefault();
        setPriorityOrder(!priorityOrder);
    }

    const handleWithStreaming = (e) => {
        e.preventDefault();
        setWithStreaming(!withStreaming);
    }

    return (
        <Grid container spacing={5}>
            <Grid item xs={6} >
                <Paper className="grid-paper">
                    <div className="ranks-container">
                        <div className="ranks-header">
                            <div>
                                <h3>Season End Rank</h3>
                                <p>Please select your Season End Rank and Division</p>
                            </div>
                            {
                                rank ? (
                                    <div className="selected-rank-container">
                                        <span className="selected-rank">{rank}</span>
                                        <img src={selectedImage} alt="Selected" />
                                    </div>
                                ) : ('')
                            }
                            
                        </div>
                        <div className="ranks">
                            <div className={rank === 'Iron' ? 'rank active' : 'rank'} onClick={e => handleRank(e, 'Iron', '/images/ranks/iron.png')}>
                                <img title="Iron" src="/images/ranks/iron.png" alt="Rank" />
                            </div>
                            <div className={rank === 'Bronze' ? 'rank active' : 'rank'} onClick={e => handleRank(e, 'Bronze', '/images/ranks/bronze.png')}>
                                <img title="Bronze" src="/images/ranks/bronze.png" alt="Rank" />
                            </div>
                            <div className={rank === 'Silver' ? 'rank active' : 'rank'} onClick={e => handleRank(e, 'Silver', '/images/ranks/silver.png')}>
                                <img title="Silver" src="/images/ranks/silver.png" alt="Rank" />
                            </div>
                            <div className={rank === 'Gold' ? 'rank active' : 'rank'} onClick={e => handleRank(e, 'Gold', '/images/ranks/gold.png')}>
                                <img title="Gold" src="/images/ranks/gold.png" alt="Rank" />
                            </div>
                            <div className={rank === 'Platinum' ? 'rank active' : 'rank'} onClick={e => handleRank(e, 'Platinum', '/images/ranks/platinum.png')}>
                                <img title="Platinum" src="/images/ranks/platinum.png" alt="Rank" />
                            </div>
                            <div className={rank === 'Diamond' ? 'rank active' : 'rank'} onClick={e => handleRank(e, 'Diamond', '/images/ranks/diamond.png')}>
                                <img title="Diamond" src="/images/ranks/diamond.png" alt="Rank" />
                            </div>
                            <div className={rank === 'Immortal' ? 'rank active' : 'rank'} onClick={e => handleRank(e, 'Immortal', '/images/ranks/immortal.png')}>
                                <img title="Immortal" src="/images/ranks/immortal.png" alt="Rank" />
                            </div>
                        </div>
                        <div className="divisions-container">
                            <div className="divisions">
                                <div className={division === 1 ? 'division active' : 'division'} onClick={e => handleDivision(e, 1)}>
                                    <strong>I</strong>
                                </div>
                                <div className={division === 2 ? 'division active' : 'division'} onClick={e => handleDivision(e, 2)}>
                                    <strong>II</strong>
                                </div>
                                <div className={division === 3 ? 'division active' : 'division'} onClick={e => handleDivision(e, 3)}>
                                    <strong>III</strong>
                                </div>
                            </div>
                            <select className="myselect" value={server} onChange={e => handleServer(e)}>
                                <option value={null}>Select Server</option>
                                <option value={'North America'}>North America</option>
                                <option value={'EU-West'}>EU-West</option>
                                <option value={'Turkey'}>Turkey</option>
                                <option value={'Brazil'}>Brazil</option>
                                <option value={'Korea'}>Korea</option>
                            </select>
                        </div>
                    </div>
                </Paper>
                <Paper className="grid-paper">
                    <div className="ranks-container">
                        <div className="games-input">
                        <div className={classes.margin} />
                            <Typography gutterBottom>Games</Typography>
                            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" 
                            step={1}
                            min={1}
                            max={5} 
                            defaultValue={games} 
                            onChange={e => handleGames(e)} />
                        <div className={classes.margin} />
                        </div>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={6} >
            <Paper className="grid-paper">
            <div className="ranks-container">
                        <div className="ranks-header">
                            <div>
                                <h3>Checkout</h3>
                            </div>
                        </div>
                        <div className="options">
                        <FormControlLabel
                            control={
                            <OrangeSwitch
                                checked={chatOffline}
                                onChange={e => handleChatOffline(e)}
                                name="chat-offline"
                            />
                            }
                            label="APPEAR OFFLINE ON CHAT FREE"
                        />
                        <FormControlLabel
                            control={
                            <OrangeSwitch
                                checked={specificAgents}
                                onChange={e => handleSpecificAgents(e)}
                                name="specific-agents"
                                color="secondary"
                            />
                            }
                            label="SPECIFIC AGENTS FREE"
                        />
                        <FormControlLabel
                            control={
                            <OrangeSwitch
                                checked={playWithBooster}
                                onChange={e => handlePlayWithBooster(e)}
                                name="play-with-booster"
                                color="secondary"
                            />
                            }
                            label="PLAY WITH BOOSTER AT +40%"
                        />
                        <FormControlLabel
                            control={
                            <OrangeSwitch
                                checked={priorityOrder}
                                onChange={e => handlePriorityOrder(e)}
                                name="priority-order"
                                color="secondary"
                            />
                            }
                            label="PRIORITY ORDER AT +20%"
                        />
                        <FormControlLabel
                            control={
                            <OrangeSwitch
                                checked={withStreaming}
                                onChange={e => handleWithStreaming(e)}
                                name="with-streaming"
                                color="secondary"
                            />
                            }
                            label="WITH STREAMING AT +20%"
                        />
                        </div>
                        <div className="checkout-price">
                            {price}&nbsp;$
                        </div>
                        <div className="options-submit">
                            <button>Boost Now</button>
                            <p>Approximate completion time: {time} days</p>
                            {
                                feedback ? (
                                    <p id="feedback">{feedback}</p>
                                ) : ('')
                            }
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}
