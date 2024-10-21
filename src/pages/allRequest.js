import React, { useState, useEffect } from "react";
import "../style.css";
import DefaultAllRequestTab from "../components/AllRequest/DefaultScreen";
import icons from "../assets/icons";
import OpenRequestComponent from "../components/AllRequest/ActiveRequestComponent";
import ResolvedRequestComponet from "../components/AllRequest/ClosedRequestComponent";
import AddChangeRequestPopUp from "../components/PopUps/AddChangeRequestPopUp";
import DeletePopUp from "../components/PopUps/DeletePopUp";
import ResolveChangeRequestPopUp from "../components/PopUps/ResolveChangeRequestPopUp.js";
import SvgAddIcon from "../icons/AddIcon.js";
import { apiService } from "../services/apiService.js";
import SkeletonLoaderComponent from "../components/loading-screen/SkeletonLoaderComponent.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiRefreshCw } from "react-icons/fi";

const AllRequests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("open");
  const [showAddChangeRequestPopUp, setAddChangeRequestPopUp] = useState(false);
  const [showDeleteDocPopUp, setDeleteDocPopUp] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const [showZeroAIEditPopUp, setZeroAIEditPopUp] = useState(false);
  const [openRequestList, setOpenRequestList] = useState([]);
  const [resolvedRequestList, setResolvedRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeSinceLastRefresh, setTimeSinceLastRefresh] = useState("");
  const [selectedByte, setSelectedByte] = useState("");
  useEffect(() => {
    getOpenRequests();
  }, []);

  const getOpenRequests = async () => {
    try {
      // setLoading(true);
      const data = await apiService.getOpenChangeRequest();
      setOpenRequestList(Array.isArray(data) ? data : []);
      setLastRefreshTime(new Date());
    } catch (error) {
      setOpenRequestList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceLastRefresh(getTimeSinceLastRefresh());
    }, 15);
    return () => clearInterval(interval);
  }, [lastRefreshTime]);

  const getTimeSinceLastRefresh = () => {
    if (!lastRefreshTime) return "";

    const seconds = Math.floor((new Date() - lastRefreshTime) / 1000);

    if (seconds < 10) return "just now";
    if (seconds < 60) return "a few seconds ago";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    return `${hours} hours ago`;
  };

  const getClosedRequests = async () => {
    try {
      // setLoading(true);
      const data = await apiService.getClosedRequest();
      setResolvedRequestList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching resolved requests:", error);
      setResolvedRequestList([]);
    } finally {
      setLoading(false);
    }
  };
  const handleTabChange = (tab) => {
    if (tab === "open") {
      getOpenRequests();
    } else {
      getClosedRequests();
    }
    setActiveTab(tab);
  };

  const handleDeleteDocPopUp = (byteId) => {
    console.log("here is the byte", byteId);
    setSelectedByte(byteId);
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

  const handleDeleteByte = async () => {
    try {
      await apiService.deleteChangeRequest(selectedByte);
    } catch (error) {
      console.log(error);
    } finally {
      getOpenRequests();
      handleCloseDeleteDocPopUp();
    }
  };

  const handleFeedback = async () => {
    await apiService.addByteFeedback(selectedByte);
    handleResolveByte();
  };

  const handleResolveByte = async () => {
    console.log(selectedByte);
    await apiService.resolveByte(selectedByte);
    handleCloseZeroEditPopUp();
    getOpenRequests();
  };

  const handlePopupToggle = () => {
    setAddChangeRequestPopUp(true);
  };

  const handleClosePopup = () => {
    setAddChangeRequestPopUp(false);
  };

  const handleRequestClick = async (byteId, aiEdits) => {
    if (aiEdits === 0) {
      setSelectedByte(byteId);
      handleZeroEditPopUp();
    } else {
      // const result = await apiService.getRecommendationForByte(byteId);
      // if (result.status === "success") {
        navigate(
          `/home/${byteId}/document-edit/loading`);
      //   );
      // } else {
      //   toast.error(result.message);
      // }
    }
  };
  return (
    <div className="all-request-home">
      <h1>Change Request</h1>
      <div className="tab-bar-header">
        <div className="tab-buttons">
          <button
            className={activeTab === "open" ? "active" : ""}
            onClick={() => {
              setLoading(true);
              handleTabChange("open");
            }}
          >
            Open
          </button>
          <button
            className={activeTab === "resolved" ? "active" : ""}
            onClick={() => {
              setLoading(true);
              handleTabChange("resolved");
            }}
          >
            Resolved
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {activeTab === "open" && openRequestList.length > 0 && (
            <div className="refresh-button" onClick={getOpenRequests}>
              <button>
                <span>Refreshed {timeSinceLastRefresh}</span>
                <FiRefreshCw size={12} />
              </button>
            </div>
          )}
          {openRequestList.length > 0 && (
            <div className="change-request-option" onClick={handlePopupToggle}>
              <img src={icons.addIcon} alt="icon" />
              <p>Change Request</p>
            </div>
          )}
        </div>
      </div>
      <div className="tab-content">
        {loading ? (
          activeTab === "open" ? (
            <SkeletonLoaderComponent length={10} />
          ) : (
            <SkeletonLoaderComponent
              length={21}
              padding="12"
              margin="3px 0px"
            />
          )
        ) : activeTab === "open" ? (
          openRequestList.length === 0 ? (
            <DefaultAllRequestTab
              text="No open requests"
              Icon={SvgAddIcon}
              buttonText="Create a Request"
              onClick={handlePopupToggle}
            />
          ) : (
            openRequestList.map((item, index) => (
              <OpenRequestComponent
                key={index}
                title={item.byteInfo}
                employee_name={item.clientId.clientName}
                date={item.createdAt}
                aiEdits={item.noOfRecommendations}
                onClick={() => {
                  handleRequestClick(item.id, item.noOfRecommendations);
                }}
                onClickDelete={() => {
                  handleDeleteDocPopUp(item.id);
                }}
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
              title={item.byteInfo}
              employee_name={item.clientId.clientName}
              date={item.createdAt}
            />
          ))
        )}
      </div>
      {/*PopUps*/}
      <AddChangeRequestPopUp
        isVisible={showAddChangeRequestPopUp}
        onClose={handleClosePopup}
        onClick={() => {
          getOpenRequests();
        }}
      />
      <DeletePopUp
        buttonText="Delete"
        isVisible={showDeleteDocPopUp}
        title="Delete Request"
        subtitle="pending pass here"
        desc="Are you sure to delete the request?"
        onClose={handleCloseDeleteDocPopUp}
        onClick={handleDeleteByte}
      />
      <ResolveChangeRequestPopUp
        isVisible={showZeroAIEditPopUp}
        onClickLButton={handleFeedback}
        onClickRButton={handleResolveByte}
        onClose={handleCloseZeroEditPopUp}
        title="0 AI edits"
        subtitle="KnowledgeKeeper AI did not find this relevant."
        lButtonText="AI is wrong"
        rButtonText="OK"
      />
    </div>
  );
};

export default AllRequests;
