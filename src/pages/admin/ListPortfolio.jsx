import React, { useEffect, useState } from "react";
import { collection, getDocs, query, doc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../../config/firebase";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditModal from "./EditModal";
import { confirmAlert } from 'react-confirm-alert'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css'; 

const ListPortfolio = () => {
  const [data, setData] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "portfolio"));
      const querySnapshot = await getDocs(q);
      const items = [];

      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const documentData = doc.data();
        documentData.id = id;
        items.push(documentData);
      });

      setData(items);
    };

    fetchData();
  }, []);

  const handleDeleteDocument = async (documentId) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-pixygreen p-8 rounded">
            <h1 className="text-2xl font-bold text-pixypink mb-4">Confirmer la suppression</h1>
            <p className="text-lg text-white mb-4">
              Êtes-vous sûr de vouloir supprimer cette Photo ?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-pixypink text-white px-4 py-2 rounded mr-2"
                onClick={async () => {
                  try {
                    const documentReference = doc(db, "portfolio", documentId);
                    await deleteDoc(documentReference);
                    setData((prevData) => prevData.filter((item) => item.id !== documentId));
  
                    toast.success("Portfolio supprimé avec succès", {
                      position: toast.POSITION.TOP_CENTER,
                      autoClose: 2000,
                    });
  
                    onClose(); // Fermer le modal après la suppression
                  } catch (error) {
                    console.error("Erreur lors de la suppression du document :", error);
                  }
                }}
              >
                Oui
              </button>
              <button
                className="bg-pixycyan text-black px-4 py-2 rounded"
                onClick={() => {
                  onClose(); // Fermer le modal si l'utilisateur choisit "Non"
                }}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      ),
    });
  };
  

  const handleEditDocument = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  const updatePortfolio = (updatedPortfolio) => {
    setData((prevData) =>
      prevData.map((portfolio) =>
        portfolio.id === updatedPortfolio.id ? updatedPortfolio : portfolio
      )
    );
    setSelectedPortfolio(null);
  
    toast.success("Portfolio modifié avec succès", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, 
    });
    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maxPageNumbersToShow = 5; 
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(filteredData.length, startPage + maxPageNumbersToShow - 1);

  const pageNumbers = Array.from({ length: Math.ceil(filteredData.length / 10) }, (_, index) => index + 1);

  const renderPageNumbers = pageNumbers
    .slice(startPage - 1, endPage)
    .map((number) => (
      <button
        key={number}
        onClick={() => setCurrentPage(number)}
        className={`mx-2 p-2 ${
          currentPage === number ? "bg-pixygreen text-white" : "bg-pixycyan text-white"
        }`}
      >
        {number}
      </button>
    ));

  return (
    <div className="text-pixycyan">
      <h1 className="text-center text-3xl font-bold text-pixygreen my-2">Liste des Photos</h1>
      <input
        type="text"
        placeholder="Rechercher..."
        className="md:w-1/5 w-full p-2 rounded focus:outline-none mb-4 bg-pixycyan text-pixygreen"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="bg-pixygreen text-center">
        <thead>
          <tr>
          <th className="w-[1%] border border-pixybeige md:text-lg text-sm">Image</th>
            <th className="w-1/12 border border-pixybeige p-2 md:text-lg text-sm">Titre</th>
            <th className="w-1/12 border border-pixybeige md:text-lg text-sm">Description</th>

            <th className="w-1/12 border border-pixybeige md:text-lg text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map((item) => (
              <tr key={item.id} className="text-codedragi-blue font-semibold">
                <td className="border border-pixybeige text-pixypink md:text-lg text-sm w-auto p-2">
                <img src={item.images} alt={item.title} className="h-10 w-10 rounded-full mx-auto" />
              </td>
                <td className="border border-pixybeige p-2 text-pixypink md:text-lg text-sm">{item.title}</td>
                <td className="border border-pixybeige text-pixypink md:text-lg text-sm">{item.description}</td>
               
                <td className="border border-pixybeige text-pixypink md:text-lg text-sm">
                  <button onClick={() => handleEditDocument(item)}>
                    <FaEdit className="text-pixycyan hover:text-green-500 mr-4" />
                  </button>
                  <button onClick={() => handleDeleteDocument(item.id)}>
                    <FaTrash className="text-pixycyan hover:text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mx-2 p-2 bg-pixycyan text-white"
          >
            Précédent
          </button>
        )}
        {renderPageNumbers}
        {currentPage < pageNumbers.length && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="mx-2 p-2 bg-pixycyan text-white"
          >
            Suivant
          </button>
        )}
      </div>
      {selectedPortfolio && (
        <EditModal
          portfolio={selectedPortfolio}
          closeModal={() => setSelectedPortfolio(null)}
          updatePortfolio={updatePortfolio}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ListPortfolio;
