import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";

import "./TableEncuentas.scss";
import { getEncuentas } from "../../services/encuentas";
import ModalEdit from "../modals/ModalEdit";
import { GeneralContext } from "../../context/GeneralContext";

const TableEncuentas = () => {
  const [listEncuestas, setListEncuestas] = useState([]);
  const [datosEncuestas, setDatosEncuestas] = useState([]);
  const { objInfo } = useContext(GeneralContext);

  useEffect(() => {
    getEncuentas()
      .then((response) => {
        setListEncuestas(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [objInfo.reloadTable]);

  const [open, setOpen] = useState(false);

  const handleOpen = (data) => {
    setOpen(true);
    setDatosEncuestas(data)
  };


  const columns = [
    "identificacion",
    "calificacion_manejo",
    "calificacion_satisfaccion",
    "marca_item",
    "modelo_item",
    "factor_diferencial_item",
    {
      name: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = listEncuestas[tableMeta.rowIndex];
          return (
            <Button color="error" onClick={() => handleOpen(rowData)}>
              Editar
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "standard",
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MUIDataTable
        title={"Lista de Encuestas"}
        data={listEncuestas}
        columns={columns}
        options={options}
      />
      <ModalEdit datos={datosEncuestas} open={open} handleClose={handleClose} />
    </>
  );
};

export default TableEncuentas;
