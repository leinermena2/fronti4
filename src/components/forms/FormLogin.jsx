import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import './FormLogin.scss';

function FormLogin({ onFormSubmit }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!usuario || !contrasena) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    onFormSubmit({ usuario, contrasena });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
      }}
    >
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesion</h2>
        <div id="containerInputs">
        <div className="form-group">
          <TextField
            fullWidth
            label="Usuario"
            variant="outlined"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
          fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        </div>
        <Button fullWidth type="submit" variant="contained" color="primary">
          Iniciar Sesión
        </Button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </Box>
  );
}

export default FormLogin;
