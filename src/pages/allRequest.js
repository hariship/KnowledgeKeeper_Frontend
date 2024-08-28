import React, { useState } from 'react';
import "../style.css";
import DefaultAllRequestTab from '../components/AllRequest/DefaultScreen';
import icons from '../assets/icons';
import OpenRequestComponent from '../components/AllRequest/ActiveRequestComponent';
import ResolvedRequestComponet from '../components/AllRequest/ClosedRequestComponent';

const openRequestList = [
    { title: "Do you have section for Anchor?", employee_name: "Viresh Dhruv", date: "12 July ‘24, 02:00pm", ai_edits: 25 },
    { title: "Do you have section for Anchor?", employee_name: "Viresh Dhruv", date: "12 July ‘24, 02:00pm", ai_edits: 25 },
    { title: "Do you have section for Anchor?", employee_name: "Viresh Dhruv", date: "12 July ‘24, 02:00pm", ai_edits: 22 },
    { title: "Do you have section for Anchor?", employee_name: "Viresh Dhruv", date: "12 July ‘24, 02:00pm", ai_edits: 25 },
];

const resolvedRequestList = [
    { title: "Do you have section for Anchor?", employee_name: "Viresh Dhruv", date: "12 July ‘24, 02:00pm", },
    { title: "Do you have section for Anchor?", employee_name: "Viresh Dhruv", date: "12 July ‘24, 02:00pm", },
    { title: "Do you have section for Anchor?", employee_name: "Viresh Dhruv", date: "12 July ‘24, 02:00pm", },
    { title: "Do you have section for Anchor?", employee_name: "Viresh Dhruv", date: "12 July ‘24, 02:00pm", },
];

const AllRequests = () => {
    const [activeTab, setActiveTab] = useState('open');
    const [showPopup, setShowPopup] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handlePopupToggle = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="all-request-home">
            <h1>Change Request</h1>
            <div className='tab-bar-header'>
                <div className="tab-buttons">
                    <button
                        className={activeTab === 'open' ? 'active' : ''}
                        onClick={() => handleTabChange('open')}
                    > Open</button>
                    <button
                        className={activeTab === 'resolved' ? 'active' : ''}
                        onClick={() => handleTabChange('resolved')}
                    >
                        Resolved
                    </button>
                </div>
                {/* Display this div only when openRequestList is not empty */}
                {activeTab === 'open' && openRequestList.length > 0 && (
                    <div className='change-request-option' onClick={handlePopupToggle}>
                        <img src={icons.addIcon} alt='icon' />
                        <p>Change Request</p>
                    </div>
                )}
            </div>
            <div className="tab-content">
                {activeTab === 'open' ? (
                    openRequestList.length === 0 ? (
                        <DefaultAllRequestTab
                            text="No open requests"
                            icon={icons.addIcon}
                            buttonText="Create a Request"
                            onClick={() => console.log('Button clicked for creating request')} />
                    ) : (
                        openRequestList.map((item, index) => (
                            <OpenRequestComponent
                                key={index}
                                title={item.title}
                                employee_name={item.employee_name}
                                date={item.date}
                                aiEdits={item.ai_edits} />
                        ))
                    )
                ) : (
                    resolvedRequestList.length === 0 ? (
                        <DefaultAllRequestTab
                            text="No requests are resolved"
                            buttonText="Check Open Request"
                            onClick={() => handleTabChange('open')} />
                    ) : (
                        resolvedRequestList.map((item, index) => (
                            <ResolvedRequestComponet
                                key={index}
                                title={item.title}
                                employee_name={item.employee_name}
                                date={item.date} />
                        ))
                    )
                )}
            </div>

            {/* Popup Component */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Change Request</h2>
                        <p>Details about how to change requests or other relevant information.</p>
                        <button onClick={handlePopupToggle}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllRequests;
