
import icons from '../../assets/icons';
import './tab-body-style.css';
import React from 'react';
const DefaultAllRequestTab = ({ text, buttonText, onClick, icon }) => {
    return (<div className='tab-body'>
        <img src={icons.changeRequestScreenIcon} alt='icon' />
        <h2>{text}</h2>
        <button onClick={onClick} className='button-style'>
            {icon && <img className='button-icon' src={icon} alt='icon'></img>}{buttonText}
        </button>
    </div>)
}

export default DefaultAllRequestTab;