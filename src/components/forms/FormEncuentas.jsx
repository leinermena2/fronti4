import React, { useState,useEffect, useContext } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getListType,getListPartner,guardarEncuestas } from "../../services/encuentas";
import { GeneralContext } from "../../context/GeneralContext";
import "./FormEncuentas.scss";

const FormEncuentas = () => {
    const { objInfo } = useContext(GeneralContext)
  const [identificacion, setIdentificacion] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [factorDiferencial, setFactorDiferencial] = useState("");
  const [calificacionManejo, setCalificacionManejo] = useState(0);
  const [calificacionSatisfaccion, setCalificacionSatisfaccion] = useState(0);

  const [listMarca, setListMarca] = useState([]);
  const [listModelo, setListModelo] = useState([]);
  const [listFactorDiferencial, setListFactorDiferencial] = useState([]);

  const handleCalificacionManejoChange = (newValue) => {
    setCalificacionManejo(newValue);
  };

  const handleCalificacionSatisfaccionChange = (newValue) => {
    setCalificacionSatisfaccion(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identificacion) {
        Swal.fire({
          title: "Error",
          text: "Por favor, completa el campo de identificación.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            container: "custom-swal-container",
          },
        });
        return; 
      }
    
    Swal.fire({
      title: "¿Está seguro de guardar?",
      text: "¡No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      customClass: {
        container: "custom-swal-container",
      },
    }).then( async (result) => {
      if (result.isConfirmed) {
        const datas = {
            identificacion: identificacion,
            marca: marca,
            modelo: modelo,
            factor_diferencial: factorDiferencial,
            calificacion_manejo: calificacionManejo,
            calificacion_satisfaccion: calificacionSatisfaccion,
        }
        const encuentaResponse = await guardarEncuestas(datas);
        if(encuentaResponse.status === "success") {
            Swal.fire({
                title: "Genial!",
                text: encuentaResponse.message,
                icon: encuentaResponse.status,
                confirmButtonText: "OK",
                customClass: {
                  container: "custom-swal-container",
                },
              });
              objInfo.setReloadTable(!objInfo.reloadTable)
              document.getElementById("closeCreate").click();
        }else{
            Swal.fire({
              title: "Error",
              text: encuentaResponse.message,
              icon: encuentaResponse.status,
              confirmButtonText: "OK",
              customClass: {
                container: "custom-swal-container",
              },
            });
        }

      } else {
        Swal.fire({
            title: "Validar Datos",
            text: "Cancelaste el envio del formulari",
            icon: "info",
            confirmButtonText: "OK",
            customClass: {
              container: "custom-swal-container",
            },
          });
      }
    });
  };

  const loadList = (type, setter) => {
    getListType(type)
      .then((response) => {
        setter(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadPartner = (id) => {
    getListPartner(id)
        .then((response) => {
            setListModelo(response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};
  useEffect(() => {
    loadList(1, setListMarca);
    loadList(2, setListFactorDiferencial); 
  }, []);

  return (
    <form onSubmit={handleSubmit} className="formulario-container">
      <TextField
        label="Identificación"
        variant="outlined"
        type="number"
        value={identificacion}
        onChange={(e) => setIdentificacion(e.target.value)}
        className="form-input"
      />

      <FormControl variant="outlined" className="form-input">
        <InputLabel id="marca-label">Marca</InputLabel>
        <Select
          labelId="marca-label"
          id="marca"
          value={marca}
          onChange={(event) => {
            const selectedBranch = event.target.value;
            loadPartner(selectedBranch);
            setMarca(selectedBranch);                    
        }}
          label="Marca"
        >
          {listMarca?.map((ref) => (
            <MenuItem key={ref.id} value={ref.id}>
              {ref.item_lista}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className="form-input">
        <InputLabel id="modelo-label">Modelo</InputLabel>
        <Select
          labelId="modelo-label"
          id="modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          label="Modelo"
        >
          {listModelo?.map((ref) => (
            <MenuItem key={ref.id} value={ref.id}>
              {ref.item_lista}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className="form-input">
        <InputLabel id="factor-diferencial-label">
          Factor Diferencial
        </InputLabel>
        <Select
          labelId="factor-diferencial-label"
          id="factor-diferencial"
          value={factorDiferencial}
          onChange={(e) => setFactorDiferencial(e.target.value)}
          label="Factor Diferencial"
        >
          {listFactorDiferencial?.map((ref) => (
            <MenuItem key={ref.id} value={ref.id}>
              {ref.item_lista}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box className="calificacion-container form-input">
        <label>Calificación Manejo:</label>
        {[1, 2, 3, 4, 5].map((value) => (
          <StarIcon
            key={value}
            className={`star-icon ${
              value <= calificacionManejo ? "active" : ""
            }`}
            onClick={() => handleCalificacionManejoChange(value)}
          />
        ))}
      </Box>

      <Box className="calificacion-container form-input">
        <label>Calificación Satisfacción:</label>
        {[1, 2, 3, 4, 5].map((value) => (
          <StarIcon
            key={value}
            className={`star-icon ${
              value <= calificacionSatisfaccion ? "active" : ""
            }`}
            onClick={() => handleCalificacionSatisfaccionChange(value)}
          />
        ))}
      </Box>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormEncuentas;
