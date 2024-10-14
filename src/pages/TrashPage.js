import React, { useEffect, useState } from "react";
import "../style.css";
import "../components/Trash/trash-style.css";
import DefaultAllRequestTab from "../components/AllRequest/DefaultScreen";
import TrashComponent from "../components/Trash/TrashComponent";
import { useNavigate } from "react-router-dom";
import SkeletonLoaderComponent from "../components/loading-screen/SkeletonLoaderComponent";
import { apiService } from "../services/apiService";

const TrashPage = () => {
  const [trashRequestList, setTrashRequestList] = useState(null);
  const navigate = useNavigate();

useEffect(()=>{
  const getTrashData = async()=>{
    const requestData=await apiService.GetTrashBytes();
    setTrashRequestList(requestData);
  };getTrashData();
},[]);


  if (!trashRequestList) {
    return (
      <div className="all-request-home">
        <h1>Trash</h1>
        <div className="tab-bar-header">
          <div className="tab-buttons">
            <button className="active">Change Requests</button>
          </div>
        </div><div className="tab-content">
        <SkeletonLoaderComponent length={21} padding="12" margin="3px 0px"/></div>
      </div>
    );
  }
  return (
    <div className="all-request-home">
      <h1>Trash</h1>
      <div className="tab-bar-header">
        <div className="tab-buttons">
          <button className="active">Change Requests</button>
        </div>
      </div>
      {trashRequestList.length === 0 ? (
        <DefaultAllRequestTab
          text="No Trash"
          buttonText="Check Open Request"
          onClick={() => {
            navigate("/home/all-requests");
          }}
        />
      ) : (
        <div className="tab-content">
          <div className="trash-content">
            {trashRequestList.map((item, index) => (
              <TrashComponent
                key={index}
                title={item.byteInfo}
                employee_name={item.clientId.clientName}
                date={item.createdAt}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrashPage;
