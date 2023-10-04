import React, {useState, useContext, useEffect} from "react";
import FormLogin from "../components/forms/FormLogin";
import { loginUsers } from '../services/usuarios'; 
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from "../context/GeneralContext";



const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { objInfo } = useContext(GeneralContext);

/*     useEffect(() => {
        if(objInfo.decodedToken){
            navigate('/admin');
          }
    }, [ objInfo.decodedToken ]); */

    const handleFormSubmit = async ({ usuario, contrasena }) => {
        try {
            const response = await loginUsers({usuario,contrasena});
            if(response.token){
                localStorage.setItem('authToken', response.token);
                navigate('/admin');
            }else{
               alert("error");
            }
          } catch (error) {
            setError('Error al iniciar sesión. Verifica tus credenciales.');
          }
      };
    
    return (
        <div>
            <FormLogin onFormSubmit={handleFormSubmit} />
        </div>
    )
}

export default Login;