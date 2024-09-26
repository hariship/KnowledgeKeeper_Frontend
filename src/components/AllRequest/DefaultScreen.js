
import SvgDefaultChangeRequestScreen from '../../icons/DefaultChangeRequestScreen';
import './tab-body-style.css';
import React from 'react';

const DefaultAllRequestTab = ({ text, buttonText, onClick, Icon=null }) => {
    return (<div className='tab-body'>
        <SvgDefaultChangeRequestScreen  className ="default-icon"/>
        <h2>{text}</h2>
        <button onClick={onClick} className='button-style'>
        {Icon && <Icon  className="button-icon"/>}
        {buttonText}
        </button>
    </div>)
}

export default DefaultAllRequestTab;