import "./trash-style.css";
import CustomTooltip from "../PopUps/CustomToolTip";
const TrashComponent = ({ title, employee_name, date }) => {
  const tooltipId = "trash-item-tooltip";
  const byteDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="trash-container">
      <div className="trash-title">
        <span data-tooltip-id={tooltipId} data-tooltip-content={title}>
          {title}
        </span>
      </div>
      <div className="trash-detail">
        {employee_name} <span>|</span> {byteDate} {time}
      </div>
      <CustomTooltip id={tooltipId} />
    </div>
  );
};

export default TrashComponent;
