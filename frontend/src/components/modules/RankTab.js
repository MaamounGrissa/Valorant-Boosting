import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import VideocamIcon from '@material-ui/icons/Videocam';

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

export default function RankTab() {
    const [selectedImage, setSelectedImage] = useState('');
    const [rank, setRank] = useState(null);
    const [division, setDivision] = useState(null);
    const [rankDetails, setRankDetails] = useState(20);
    
    const [selectedDesiredImage, setSelectedDesiredImage] = useState('');
    const [desiredRank, setDesiredRank] = useState(null);
    const [desiredRR, setDesiredRR] = useState(1);
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

    const handleChangeRankDetails = (e) => {
        e.preventDefault();
        setRankDetails(e.target.value);
    }

    const handleDesiredRank = (e, selected, imageLink) => {
        e.preventDefault();
        setDesiredRank(selected)
        setSelectedDesiredImage(imageLink)
    }

    const handleRR = (e, selected) => {
        e.preventDefault();
        setDesiredRR(selected)
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
                                <h3>Current Rank</h3>
                                <p>Please select your Current Rank and Division</p>
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
                            <select className="myselect" value={rankDetails} onChange={e => handleChangeRankDetails(e)}>
                                <option value={null}>Current rating amount</option>
                                <option value={20}>00 - 20</option>
                                <option value={40}>21 - 40</option>
                                <option value={60}>41 - 60</option>
                                <option value={80}>61 - 80</option>
                                <option value={100}>81 - 100</option>
                            </select>
                        </div>
                    </div>
                </Paper>
                <Paper className="grid-paper">
                    <div className="ranks-container">
                        <div className="ranks-header">
                            <div>
                                <h3>Desired Rank</h3>
                                <p>Please select your Desired Rank and Division</p>
                            </div>
                            {
                                desiredRank ? (
                                    <div className="selected-rank-container">
                                        <span className="selected-rank">{desiredRank}</span>
                                        <img src={selectedDesiredImage} alt="Selected" />
                                    </div>
                                ) : ('')
                            }
                            
                        </div>
                        <div className="ranks">
                            <div className={desiredRank === 'Iron' ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 'Iron', '/images/ranks/iron.png')}>
                                <img title="Iron" src="/images/ranks/iron.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 'Bronze' ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 'Bronze', '/images/ranks/bronze.png')}>
                                <img title="Bronze" src="/images/ranks/bronze.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 'Silver' ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 'Silver', '/images/ranks/silver.png')}>
                                <img title="Silver" src="/images/ranks/silver.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 'Gold' ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 'Gold', '/images/ranks/gold.png')}>
                                <img title="Gold" src="/images/ranks/gold.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 'Platinum' ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 'Platinum', '/images/ranks/platinum.png')}>
                                <img title="Platinum" src="/images/ranks/platinum.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 'Diamond' ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 'Diamond', '/images/ranks/diamond.png')}>
                                <img title="Diamond" src="/images/ranks/diamond.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 'Immortal' ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 'Immortal', '/images/ranks/immortal.png')}>
                                <img title="Immortal" src="/images/ranks/immortal.png" alt="Rank" />
                            </div>
                        </div>
                        <div className="divisions-container">
                            <div className="divisions">
                                <span className="attached-label">Desired RR</span>
                                <input type="number" value={desiredRR} min="1" max="100" onChange={e => handleRR(e)} />
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
                            <div className="switch-container">
                                <OrangeSwitch
                                    checked={chatOffline}
                                    onChange={e => handleChatOffline(e)}
                                    name="chat-offline"
                                />
                                <label className="switch-label"><SpeakerNotesOffIcon /> APPEAR OFFLINE ON CHAT <span>FREE</span></label>
                            </div>

                            <div className="switch-container">
                                <OrangeSwitch
                                    checked={specificAgents}
                                    onChange={e => handleSpecificAgents(e)}
                                    name="specific-agents"
                                />
                                <label className="switch-label"><PeopleIcon /> SPECIFIC AGENTS <span>FREE</span></label>
                            </div>

                            <div className="switch-container">
                                <OrangeSwitch
                                    checked={playWithBooster}
                                    onChange={e => handlePlayWithBooster(e)}
                                    name="play-with-booster"
                                />
                                <label className="switch-label"><PersonAddIcon /> PLAY WITH BOOSTER AT <span>+40%</span></label>
                            </div>

                            <div className="switch-container">
                                <OrangeSwitch
                                    checked={priorityOrder}
                                    onChange={e => handlePriorityOrder(e)}
                                    name="priority-order"
                                />
                                <label className="switch-label"><FlashOnIcon /> PRIORITY ORDER AT <span>+20%</span></label>
                            </div>

                            <div className="switch-container">
                                <OrangeSwitch
                                    checked={withStreaming}
                                    onChange={e => handleWithStreaming(e)}
                                    name="with-streaming"
                                />
                                <label className="switch-label"><VideocamIcon /> WITH STREAMING AT <span>+20%</span></label>
                            </div>
                        
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
