import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import RankTab from './modules/RankTab.js';
import PlacementTab from './modules/PlacementTab.js';
import WinTab from './modules/WinTab.js'
import { useDispatch, useSelector } from 'react-redux';
import { ListSetting } from '../actions/settingActions.js';


function Home () {

    const dispatch = useDispatch();

    const [rank, setRank] = useState(true);
    const [placement, setPlacement] = useState(false);
    const [win, setWin] = useState(false);

    const settingList = useSelector((state) => state.settingList);
    const { setting } = settingList;

    const handleRank = (e) => {
        e.preventDefault();
        setPlacement(false);
        setRank(true);
        setWin(false);
    }

    const handlePlacement= (e) => {
        e.preventDefault();
        setRank(false);
        setPlacement(true);
        setWin(false);
    }

    const handleWin= (e) => {
        e.preventDefault();
        setRank(false);
        setPlacement(false);
        setWin(true);
    }

    useEffect(() => {
        dispatch(ListSetting());
    }, [dispatch])

    return (
        <div className="intro-container">
            <div className="intro-content">
                <img src="/images/vlrnt.png" alt="vlnrt" />
                <h2>VLRNT Boosting</h2>
                <p>Leading VALORANT Boosting Service</p>
                <div className="intro-actions">
                    <button className={rank ? 'active' : ''} onClick={e => handleRank(e)} >Rank Boosting</button>
                    <button className={placement ? 'active' : ''} onClick={e => handlePlacement(e)} >Placements</button>
                    <button className={win ? 'active' : ''} onClick={e => handleWin(e)} >Competitive Wins</button>
                </div>
                <div className="intro-tabs">
                <TransitionGroup component={null}>
                {
                rank ? (
                    <CSSTransition
                    in={rank}
                    transitionName="myanimation"
                    timeout={300}>
                        <RankTab setting={setting} />
                    </CSSTransition >
                ) : placement ? (
                    <CSSTransition
                    in={placement}
                    transitionName="myanimation"
                    timeout={300}>
                        <PlacementTab setting={setting} />
                    </CSSTransition >
                ) : win ? (
                    <CSSTransition
                    in={win}
                    transitionName="myanimation"
                    timeout={300}>
                        <WinTab setting={setting} />
                    </CSSTransition >
                ) : ('')
                }
                </TransitionGroup>
                </div>
            </div>
        </div>
    )
}

export default Home;