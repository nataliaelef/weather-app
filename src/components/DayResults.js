import React from 'react';

const DayResults = props => {
  let { data, city } = props;
  let box = null;
  let image = null;
  if (data.length) {
    image = <img src="https://source.unsplash.com/HOtPD7Z_74s/300*200" />;
    box = 'results';
  }
  return (
    <div className={box}>
      <div className="image">{image}</div>
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
  );
};
export default DayResults;
