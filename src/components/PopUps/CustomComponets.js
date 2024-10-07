const HeaderSubHeadingComponent = ({ title, subtitle }) => {
  return (
    <div className="header-subheading-content">
      <h1>{title}</h1>
      {subtitle}
    </div>
  );
};

export default HeaderSubHeadingComponent;
