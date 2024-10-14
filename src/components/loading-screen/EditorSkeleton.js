const EditorSkeleton = ({ width = '100%', height = '50px', padding = '0', borderRadius = '4px' }) => {
    const style = {
      width,
      height,
      padding,
      borderRadius,
    };
  
    return (
      <div className="editor-loader" style={style}></div>
    );
  };
  
  export default EditorSkeleton;
  