import React from 'react';

const ProgressBar = (props) => {
    const { bgcolor, completed, height = 20, width = '100%', margin = 50 } = props;
  
    const containerStyles = {
      height: height,
      width: width,
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: margin
    }
  
    const fillerStyles: React.CSSProperties = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 50,
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
  
    return (
      <div>
        <div style={containerStyles}>
          <div style={fillerStyles}>
            <span style={labelStyles}>{`${completed}%`}</span>
          </div>
        </div>
      </div>
    );
};

export default ProgressBar;
