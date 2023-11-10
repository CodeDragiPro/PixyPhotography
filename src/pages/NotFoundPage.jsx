import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-center">
      <h1 className="md:text-[20em] text-[10rem] text-pixygreen mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-2">
        Oops! La page n'a pas été trouvée.
      </p>
      <p className="text-lg text-gray-700 mb-8">
        Cliquer sur le bouton pour retourner a l'acceuil.
      </p>
      <Link
        to="/"
        className="bg-pixygreen hover:bg-pixypink text-white px-4 py-2 rounded text-lg"
      >
        Retourner avec pixy
      </Link>
    </div>
  );
};

export default NotFoundPage;
