import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import './ModalEncuenta.scss';
import FormEncuentas from '../forms/FormEncuentas';

const ModalEncuenta = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <h2 id="modal-modal-title">Completar Datos</h2>
        <FormEncuentas />
        <Button style={{display:"none"}} variant="contained" id='closeCreate' color="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalEncuenta;
