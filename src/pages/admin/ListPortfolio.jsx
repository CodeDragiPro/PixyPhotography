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
      title: 'Confirmer la suppression',
      message: 'Êtes-vous sûr de vouloir supprimer cette Photo ?',
      buttons: [
        {
          label: 'Oui',
          onClick: async () => {
            try {
              const documentReference = doc(db, "portfolio", documentId);
              await deleteDoc(documentReference);
              setData((prevData) => prevData.filter((item) => item.id !== documentId));

              toast.success("Portfolio supprimé avec succès", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000, 
              });
            } catch (error) {
              console.error("Erreur lors de la suppression du document :", error);
            }
          },
        },
        {
          label: 'Non',
          onClick: () => {},
        },
      ],
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

  return (
    <div className="text-pixycyan">
      <h1 className="text-center text-3xl font-bold text-pixygreen my-2">Liste des Photos</h1>
      <table className="bg-pixygreen text-center">
        <thead>
          <tr>
            <th className="w-1/12 border border-pixybeige p-2 md:text-lg text-sm">Titre</th>
            <th className="w-1/12 border border-pixybeige md:text-lg text-sm">Description</th>
            <th className="w-1/12 border border-pixybeige md:text-lg text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-codedragi-blue font-semibold">
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
