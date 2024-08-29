import React, { useState } from "react";
import "../style.css";
import DefaultAllRequestTab from "../components/AllRequest/DefaultScreen";
import icons from "../assets/icons";
import OpenRequestComponent from "../components/AllRequest/ActiveRequestComponent";
import ResolvedRequestComponet from "../components/AllRequest/ClosedRequestComponent";
import AddChangeRequestPopUp from "../components/PopUps/AddChangeRequestPopUp";
import DeletePopUp from "../components/PopUps/DeletePopUp";
import ResolveChangeRequestPopUp from "../components/PopUps/ResolveChangeRequestPopUp.js";

const openRequestList = [
  {
    title: "Do you have section for Anchor?Do you have section for Anchor?Do you have section for Anchor?Do you have section for Anchor?Do you have section for Anchor?",
    employee_name: "Viresh Dhruv",
    date: "12 July ‘24, 02:00pm",
    ai_edits: 25,
  },
  {
    title: "Do you have section for Anchor?",
    employee_name: "Viresh Dhruv",
    date: "12 July ‘24, 02:00pm",
    ai_edits: 25,
  },
  {
    title: "Do you have section for Anchor?",
    employee_name: "Viresh Dhruv",
    date: "12 July ‘24, 02:00pm",
    ai_edits: 0,
  },
  {
    title: "Do you have section for Anchor?",
    employee_name: "Viresh Dhruv",
    date: "12 July ‘24, 02:00pm",
    ai_edits: 25,
  },
];

const resolvedRequestList = [
  {
    title: "Do you have section for Anchor?",
    employee_name: "Viresh Dhruv",
    date: "12 July ‘24, 02:00pm",
  },
  {
    title: "Do you have section for Anchor?",
    employee_name: "Viresh Dhruv",
    date: "12 July ‘24, 02:00pm",
  },
  {
    title: "Do you have section for Anchor?",
    employee_name: "Viresh Dhruv",
    date: "12 July ‘24, 02:00pm",
  },
  {
    title: "Do you have section for Anchor?",
    employee_name: "Viresh Dhruv",
    date: "12 July ‘24, 02:00pm",
  },
];

const AllRequests = () => {
  const [activeTab, setActiveTab] = useState("open");
  const [showAddChangeRequestPopUp, setAddChangeRequestPopUp] = useState(false);
  const [showDeleteDocPopUp, setDeleteDocPopUp] = useState(false);
  const [showZeroAIEditPopUp, setZeroAIEditPopUp] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteDocPopUp = () => {
    setDeleteDocPopUp(true);
  };
  const handleCloseZeroEditPopUp = () => {
    setZeroAIEditPopUp(false);
  };

  const handleZeroEditPopUp = () => {
    setZeroAIEditPopUp(true);
  };

  const handleCloseDeleteDocPopUp = () => {
    setDeleteDocPopUp(false);
  };

  const handlePopupToggle = () => {
    setAddChangeRequestPopUp(true);
  };

  const handleClosePopup = () => {
    setAddChangeRequestPopUp(false);
  };

  const handleRequestClick = (aiEdits) => {
    if (aiEdits === 0) {
      handleZeroEditPopUp();
    }
  };
  return (
    <div className="all-request-home">
      <h1>Change Request</h1>
      <div className="tab-bar-header">
        <div className="tab-buttons">
          <button
            className={activeTab === "open" ? "active" : ""}
            onClick={() => handleTabChange("open")}
          >
            Open
          </button>
          <button
            className={activeTab === "resolved" ? "active" : ""}
            onClick={() => handleTabChange("resolved")}
          >
            Resolved
          </button>
        </div>
        {openRequestList.length > 0 && (
          <div className="change-request-option" onClick={handlePopupToggle}>
            <img src={icons.addIcon} alt="icon" />
            <p>Change Request</p>
          </div>
        )}
      </div>
      <div className="tab-content">
        {activeTab === "open" ? (
          openRequestList.length === 0 ? (
            <DefaultAllRequestTab
              text="No open requests"
              icon={icons.addIcon}
              buttonText="Create a Request"
              onClick={handlePopupToggle}
            />
          ) : (
            openRequestList.map((item, index) => (
              <OpenRequestComponent
                key={index}
                title={item.title}
                employee_name={item.employee_name}
                date={item.date}
                aiEdits={item.ai_edits}
                onClick={() => {
                  handleRequestClick(item.ai_edits);
                }}
                onClickDelete={handleDeleteDocPopUp}
              />
            ))
          )
        ) : resolvedRequestList.length === 0 ? (
          <DefaultAllRequestTab
            text="No requests are resolved"
            buttonText="Check Open Request"
            onClick={() => handleTabChange("open")}
          />
        ) : (
          resolvedRequestList.map((item, index) => (
            <ResolvedRequestComponet
              key={index}
              title={item.title}
              employee_name={item.employee_name}
              date={item.date}
            />
          ))
        )}
      </div>
      {/*PopUps*/}
      <AddChangeRequestPopUp
        isVisible={showAddChangeRequestPopUp}
        onClose={handleClosePopup}
      />
      <DeletePopUp
        isVisible={showDeleteDocPopUp}
        title="Delete Document"
        subtitle="All the applied changes will be lost"
        desc="Are you sure to delete the document?"
        onClose={handleCloseDeleteDocPopUp}
      />
      <ResolveChangeRequestPopUp
        isVisible={showZeroAIEditPopUp}
        onClose={handleCloseZeroEditPopUp}
        title="0 AI edits"
        subtitle="KnowledgeKeeper AI did not find this relevant."
        lButtonText='AI is wrong'
        rButtonText="OK"
        
      />
    </div>
  );
};

export default AllRequests;
