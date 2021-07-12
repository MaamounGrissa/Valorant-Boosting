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
import OrderModal from './OrderModal.js'

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

export default function RankTab(props) {

    const [order, setOrder] = useState({});
    const [showOrderModal, setShowOrderModal] = useState(false);

    const [selectedImage, setSelectedImage] = useState('');
    const [rank, setRank] = useState(0);
    const [division, setDivision] = useState(0);
    const [ratingAmount, setRatingAmount] = useState(0);
    
    const [selectedDesiredImage, setSelectedDesiredImage] = useState('');
    const [desiredRank, setDesiredRank] = useState(0);
    const [desiredDivision, setDesiredDivision] = useState(0);
    const [server, setServer] = useState('');

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
        if (desiredRank === 0) {
            setRank(selected);
            setSelectedImage(imageLink);
        } else {
            if (selected < desiredRank) {
                setRank(selected);
                setSelectedImage(imageLink);
            }
        }
    }

    const handleDivision = (e, selected) => {
        e.preventDefault();
        setDivision(selected)
    }

    const handleChangeRatingAmount = (e) => {
        e.preventDefault();
        setRatingAmount(e.target.value);
    }

    const handleDesiredRank = (e, selected, imageLink) => {
        e.preventDefault();
        if (selected > rank) {
            setDesiredRank(selected)
            setSelectedDesiredImage(imageLink)
        }
    }

    const handleDesiredDivision = (e, selected) => {
        e.preventDefault();
        setDesiredDivision(selected)
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
        setPlayWithBooster(false);
        setSpecificAgents(!specificAgents);
        setPrice(20);

    }

    const handlePlayWithBooster = (e) => {
        e.preventDefault();
        setChatOffline(false);
        setSpecificAgents(false);
        setWithStreaming(false);
        setPlayWithBooster(!playWithBooster);
    }

    const handlePriorityOrder = (e) => {
        e.preventDefault();
        setPriorityOrder(!priorityOrder);
    }

    const handleWithStreaming = (e) => {
        e.preventDefault();
        setPlayWithBooster(false);
        setWithStreaming(!withStreaming);
        setTime('2-3');
    } 

    const handleShowOrderModal = (e) => {
        e.preventDefault();
        if (rank === 0) {
            setFeedback('Select your start rank !');
        } else if (division === 0) {
            setFeedback('Select your start division !');
        } else if (desiredRank === 0) {
            setFeedback('Select your desired rank !');
        } else if (desiredDivision === 0) {
            setFeedback('Select your desired division !');
        } else if (server === '') {
                setFeedback('Select your server !')
        } else {
            setOrder({
                boostType : 'Rank Boosting',
                startRank : rank,
                startDivision: division,
                ratingAmount: ratingAmount,
                desiredRank: desiredRank,
                desiredDivision: desiredDivision,
                server: server
            })
            setShowOrderModal(true);
        }
    }

    const ranks = [
        "Iron",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Immortal"
    ];

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} md={6} >
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
                                        <span className="selected-rank">
                                        {ranks[rank - 1]}
                                        </span>
                                        <img src={selectedImage} alt="Selected" />
                                    </div>
                                ) : ('')
                            }
                            
                        </div>
                        <div className="ranks">
                            <div className={rank === 1 ? 'rank active' : 'rank'} onClick={e => handleRank(e, 1, '/images/ranks/iron.png')}>
                                <img title="Iron" src="/images/ranks/iron.png" alt="Rank" />
                            </div>
                            <div className={rank === 2 ? 'rank active' : 'rank'} onClick={e => handleRank(e, 2, '/images/ranks/bronze.png')}>
                                <img title="Bronze" src="/images/ranks/bronze.png" alt="Rank" />
                            </div>
                            <div className={rank === 3 ? 'rank active' : 'rank'} onClick={e => handleRank(e, 3, '/images/ranks/silver.png')}>
                                <img title="Silver" src="/images/ranks/silver.png" alt="Rank" />
                            </div>
                            <div className={rank === 4 ? 'rank active' : 'rank'} onClick={e => handleRank(e, 4, '/images/ranks/gold.png')}>
                                <img title="Gold" src="/images/ranks/gold.png" alt="Rank" />
                            </div>
                            <div className={rank === 5 ? 'rank active' : 'rank'} onClick={e => handleRank(e, 5, '/images/ranks/platinum.png')}>
                                <img title="Platinum" src="/images/ranks/platinum.png" alt="Rank" />
                            </div>
                            <div className={rank === 6 ? 'rank active' : 'rank'} onClick={e => handleRank(e, 6, '/images/ranks/diamond.png')}>
                                <img title="Diamond" src="/images/ranks/diamond.png" alt="Rank" />
                            </div>
                            <div className={rank === 7 ? 'rank active' : 'rank'} onClick={e => handleRank(e, 7, '/images/ranks/immortal.png')}>
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
                            <select className="myselect" value={ratingAmount} onChange={e => handleChangeRatingAmount(e)}>
                                <option value={0}>Current rating amount</option>
                                <option value={10}>00 - 20</option>
                                <option value={30}>21 - 40</option>
                                <option value={50}>41 - 60</option>
                                <option value={60}>61 - 80</option>
                                <option value={90}>81 - 100</option>
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
                                        <span className="selected-rank">
                                            {ranks[desiredRank - 1]}
                                        </span>
                                        <img src={selectedDesiredImage} alt="Selected" />
                                    </div>
                                ) : ('')
                            }
                            
                        </div>
                        <div className="ranks">
                            <div className={desiredRank === 1 ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 1, '/images/ranks/iron.png')}>
                                <img title="Iron" src="/images/ranks/iron.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 2 ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 2, '/images/ranks/bronze.png')}>
                                <img title="Bronze" src="/images/ranks/bronze.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 3 ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 3, '/images/ranks/silver.png')}>
                                <img title="Silver" src="/images/ranks/silver.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 4 ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 4, '/images/ranks/gold.png')}>
                                <img title="Gold" src="/images/ranks/gold.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 5 ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 5, '/images/ranks/platinum.png')}>
                                <img title="Platinum" src="/images/ranks/platinum.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 6 ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 6, '/images/ranks/diamond.png')}>
                                <img title="Diamond" src="/images/ranks/diamond.png" alt="Rank" />
                            </div>
                            <div className={desiredRank === 7 ? 'rank active' : 'rank'} onClick={e => handleDesiredRank(e, 7, '/images/ranks/immortal.png')}>
                                <img title="Immortal" src="/images/ranks/immortal.png" alt="Rank" />
                            </div>
                        </div>
                        <div className="divisions-container">
                            <div className="divisions">
                                <div className={desiredDivision === 1 ? 'division active' : 'division'} onClick={e => handleDesiredDivision(e, 1)}>
                                    <strong>I</strong>
                                </div>
                                <div className={desiredDivision === 2 ? 'division active' : 'division'} onClick={e => handleDesiredDivision(e, 2)}>
                                    <strong>II</strong>
                                </div>
                                <div className={desiredDivision === 3 ? 'division active' : 'division'} onClick={e => handleDesiredDivision(e, 3)}>
                                    <strong>III</strong>
                                </div>
                            </div>
                            <select className="myselect" value={server} onChange={e => handleServer(e)}>
                                <option value={''}>Select Server</option>
                                <option value={'EUW'}>EUW</option>
                                <option value={'EUNE'}>EUNE</option>
                                <option value={'NA'}>NA</option>
                                <option value={'OCE'}>OCE</option>
                                <option value={'TR'}>TR</option>
                            </select>
                        </div>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} >
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
                                    disabled={playWithBooster ? true : false}
                                />
                                <label className="switch-label"><SpeakerNotesOffIcon /> APPEAR OFFLINE ON CHAT <span>FREE</span></label>
                            </div>

                            <div className="switch-container">
                                <OrangeSwitch
                                    checked={specificAgents}
                                    onChange={e => handleSpecificAgents(e)}
                                    name="specific-agents"
                                    disabled={playWithBooster ? true : false}
                                />
                                <label className="switch-label"><PeopleIcon /> SPECIFIC AGENTS <span>FREE</span></label>
                            </div>

                            <div className="switch-container">
                                <OrangeSwitch
                                    checked={playWithBooster}
                                    onChange={e => handlePlayWithBooster(e)}
                                    name="play-with-booster"
                                    disabled={withStreaming || specificAgents ? true : false}
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
                                    disabled={playWithBooster ? true : false}
                                />
                                <label className="switch-label"><VideocamIcon /> WITH STREAMING AT <span>+20%</span></label>
                            </div>
                        
                        </div>
                        <div className="checkout-price">
                            {price}&nbsp;$
                        </div>
                        <div className="options-submit">
                            <button onClick={e => handleShowOrderModal(e)} >Boost Now</button>
                            <p>Approximate completion time: {time} days</p>
                            {
                                feedback ? (
                                    <p id="feedback">{feedback}</p>
                                ) : ('')
                            }
                        </div>
                    </div>
                    <OrderModal showOrderModal={showOrderModal} onClose={e => setShowOrderModal(false)} order={order} />
                </Paper>
            </Grid>
            
        </Grid>
    )
}
