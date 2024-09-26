import "./trash-style.css";
import CustomTooltip from "../PopUps/CustomToolTip";
const TrashComponent = ({ title, employee_name, date }) => {
  const tooltipId = "trash-item-tooltip";

  return (
    <div className="trash-container">
      <div className="trash-title">
        <span data-tooltip-id={tooltipId} data-tooltip-content={title}>
          {title}
        </span>
      </div>
      <div className="trash-detail">
        {employee_name} <span>|</span> {date}
      </div>
      <CustomTooltip id={tooltipId} />
    </div>
  );
};

export default TrashComponent;
