import React from 'react';

const DayResults = props => {
  let { data, city, photoData } = props;
  let box = null;
  let image = null;
  if (data.length && photoData) {
    image = <img alt={`${city}`} src={photoData.urls.small} />;
    box = 'results';
  }
  return (
    <div className={box}>
      <div className="image">{image}</div>
      <div className='resultData'>
      <h3>{city}</h3>
      {data.map(([key, value]) => {
        return (
          <p key={key}>
            <span>{key} </span>:
            <span>{key.includes('temp') ? `${value} \xB0C` : value} </span>
          </p>
        );
      })}
      </div>
    </div>
  );
};
export default DayResults;
