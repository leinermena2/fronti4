import React, {useContext, useEffect, useState} from "react";
import NavBarAdmin from "../components/navbars/NavBarAdmin";
import TableEncuentas from "../components/tablas/TableEncuentas";
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from "../context/GeneralContext";


const Admin = () => {
  const navigate = useNavigate();
  const { objInfo } = useContext(GeneralContext);
  const [user, setUser] = useState("prop")

  useEffect(() => {
      if(!objInfo.decodedToken){
          navigate('/login');
        }else{
        setUser(objInfo.decodedToken.usuario);
      }
  }, [ ]);
 
    return (
        <div>
            <NavBarAdmin user={user}  />
            <TableEncuentas />
        </div>
    )

}

export default Admin;