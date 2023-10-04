import React, { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';

export const GeneralContext = createContext();

export function GeneralContextProvider(props) {
  const [token, setToken] = useState('');
  const [reloadTable, setReloadTable] = useState(false);
  function getCurrentDateTime() {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedDateTime;
  }

  const currentDateTime = getCurrentDateTime();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const decodedToken = token ? jwt_decode(token) : null;

  const objInfo = {
    decodedToken,
    currentDateTime,
    setReloadTable,
    reloadTable
  };

  

  return (
    <GeneralContext.Provider value={{ objInfo }}>
      {props.children}
    </GeneralContext.Provider>
  );
}
