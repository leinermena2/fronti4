import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import './ModalEncuenta.scss';
import FormEdit from '../forms/FormEdit';

const ModalEdit = ({ open, handleClose,datos }) => {
    
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <h2 id="modal-modal-title">Editar Datos</h2>
        <FormEdit datosActuales={datos} />
        <Button variant="contained" style={{display:"none"}} id='closeEdit' color="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
