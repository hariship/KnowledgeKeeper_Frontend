import React from "react";
import "../style.css";
import "../components/Trash/trash-style.css";
import DefaultAllRequestTab from "../components/AllRequest/DefaultScreen";
import TrashComponent from "../components/Trash/TrashComponent";
import { useNavigate } from "react-router-dom";

const TrashPage = () => {
  const trashRequestList = [
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
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },
      {
        title: "Do you have section for Anchor?",
        employee_name: "Viresh Dhruv",
        date: "12 July ‘24, 02:00pm",
      },  {
      title: "Do you have section for Anchor?",
      employee_name: "Viresh Dhruv",
      date: "12 July ‘24, 02:00pm",
    },
    {
      title: "Do you have section for Anchor?Do you have section for Anchor?Do you have section for Anchor?Do you have section for Anchor?Do you have section for Anchor?",
      employee_name: "Viresh Dhruv",
      date: "12 July ‘24, 02:00pm",
    },
  ];
  const navigate = useNavigate();

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
              title={item.title}
              employee_name={item.employee_name}
              date={item.date}
            />
          ))}
        </div></div>
      )}
    </div>
  );
};

export default TrashPage;
