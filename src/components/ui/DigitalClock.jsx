import React, { useEffect, useState } from 'react';

const DigitalClock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  return (
    <div className="text-center">
      <div className="flex justify-center items-center">
        <div className="bg-tertiary rounded-md p-2 m-2">
          <p className="text-3xl font-bold text-white">
            {formatTimeUnit(currentDateTime.getHours())}
          </p>
        </div>
          <p className="text-3xl font-bold text-white flex items-center">
           :
          </p>
        <div className="bg-tertiary rounded-md p-2 m-2">
          <p className="text-3xl font-bold text-white">
            {formatTimeUnit(currentDateTime.getMinutes())}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default DigitalClock;
