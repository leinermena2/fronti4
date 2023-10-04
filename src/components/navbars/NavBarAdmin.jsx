import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import ModalEncuenta from "../modals/modalEncuenta";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NavBarAdmin = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSesion = () => {
    Swal.fire({
      title: "¿Estás seguro de cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();

        navigate("/login");

        Swal.fire("Sesión cerrada", "", "success");
      }
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user}
          </Typography>

          <Button color="inherit" onClick={handleOpen}>
            Crear Encuenta
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseSesion}
          >
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <ModalEncuenta open={open} handleClose={handleClose} />
    </>
  );
};

export default NavBarAdmin;
