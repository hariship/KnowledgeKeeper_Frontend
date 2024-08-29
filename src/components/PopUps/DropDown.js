import './popup-style.css';
const DropdownMenu = ({style, options, onSelect }) => (
    <div style={style} className="dropdown-menu">
      {options.map((option, index) => (
        <div className="dropdown-item" key={index} onClick={() => onSelect(option)}>
          <img src={option.icon} alt={option.label} className="dropdown-icon" />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  );

  export default DropdownMenu;