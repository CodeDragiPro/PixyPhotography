import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../config/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault(); 
  
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Authentification réussie!");
  
        localStorage.setItem("authenticated", "true");
  
        toast.success('Authentification réussie !', { position: toast.POSITION.BOTTOM_RIGHT });
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`Erreur d'authentification`, { position: toast.POSITION.BOTTOM_RIGHT });
      });
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen p-4  flex-1">
      <div className="max-w-xl w-full bg-primary  p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold  text-center text-white">Authentification</h2>
        <p className="text-center text-white py-2">Seul un administrateur peut s'authentifié</p>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded p-2 mb-2 focus:outline-none text-secondary"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded p-2 mb-4 focus:outline-none text-secondary"
            required
          />
          <button
            type="submit" 
            className="w-full bg-tertiary hover:bg-secondary text-white rounded p-2  text-xl"
          >
            Se connecter
          </button>
        </form>
       
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
