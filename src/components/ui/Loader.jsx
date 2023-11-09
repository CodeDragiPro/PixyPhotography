import React from 'react';
import { MdOutlineCameraswitch } from 'react-icons/md';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <MdOutlineCameraswitch className="animate-spin text-6xl text-black" />
    </div>
  );
};

export default Loader;
