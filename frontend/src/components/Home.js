import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import RankTab from './modules/RankTab.js';
import PlacementTab from './modules/PlacementTab.js';


function Home () {

    const [rank, setRank] = useState(true);
    const [placement, setPlacement] = useState(false);

    const handleRank = (e) => {
        e.preventDefault();
        setPlacement(false);
        setRank(true);
    }

    const handlePlacement= (e) => {
        e.preventDefault();
        setRank(false);
        setPlacement(true);
    }

    return (
        <div className="intro-container">
            <img src="/images/main-bg.gif" alt="GifBackground" />
            <div className="overlay">&nbsp;</div>
            <div className="intro-content">
                <img src="/images/vlrnt.png" alt="vlnrt" />
                <h2>VLRNT Boosting</h2>
                <p>Leading VALORANT Boosting Service</p>
                <div className="intro-actions">
                    <button className={rank ? 'active' : ''} onClick={e => handleRank(e)} >Rank Boosting</button>
                    <button className={placement ? 'active' : ''} onClick={e => handlePlacement(e)} >Placements</button>
                </div>
                <div className="intro-tabs">
                <TransitionGroup component={null}>
                {
                rank ? (
                    <CSSTransition  
                    transitionName="myanimation"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                        <RankTab />
                    </CSSTransition >
                ) : placement ? (
                    <CSSTransition  
                    transitionName="myanimation"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                        <PlacementTab />
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