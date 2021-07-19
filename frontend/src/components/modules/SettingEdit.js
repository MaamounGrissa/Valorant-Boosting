import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { EditSetting } from '../../actions/settingActions';
import MessageBox from './MessageBox';

export default function SettingEdit(props) {

    const {selectedSetting, showEditSetting} = props;
    const [changeValue, setChangeValue] = useState(null);
    const settingEdit = useSelector((state) => state.settingEdit);
    const { feedback, loadingSetting, errorSetting } = settingEdit;

    const dispatch = useDispatch();

    const handleCloseEditSetting = (e) => {
        e.preventDefault();
        setChangeValue(null);
        props.onClose();
    }

    const handleSaveSetting = (e) => {
        e.preventDefault();
        dispatch(EditSetting(selectedSetting._id, changeValue)).then(() => {
            setChangeValue(null);
            props.onClose();
        });
    }

    const ranks = [
        "Unranked",
        "Iron",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Immortal",
        "Radiant",
    ];
  
    const divisions = [
        "Nothing",
        "I",
        "II",
        'III',
    ];

    if (showEditSetting && selectedSetting) {
        return (
            <div className="setting-edit-modal show">
                <button id="close-modal" onClick={e => handleCloseEditSetting(e)} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <div className="edit-box">
                <label>
                    {ranks[selectedSetting.rank] + ' ' + 
                        divisions[selectedSetting.division] + ' => ' + 
                        ranks[selectedSetting.desiredRank] + ' ' + 
                        divisions[selectedSetting.desiredDivision]}
                    </label>
                    <input type="number" step="0.1" value={changeValue || parseFloat(selectedSetting.amount)} 
                        onChange={e => setChangeValue(e.target.value)}
                    />
                    <button onClick={e => handleSaveSetting(e)}>
                        Save&nbsp;&nbsp;
                        {
                            loadingSetting ? (
                                    <img src="/images/loading-buffering.gif" width='20' alt="Loading" />
                            ) : ( '' )
                        }
                    </button>
                    {
                        feedback ? (
                            <MessageBox>{feedback}</MessageBox>
                        ) : errorSetting ? (
                            <MessageBox variant="danger">{errorSetting}</MessageBox>
                        ) : ( '' )
                    }
                </div>
            </div>
        )
    } else {
        return null
    }
}
