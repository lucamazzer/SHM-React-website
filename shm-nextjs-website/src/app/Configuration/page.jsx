'use client';
import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { configSystem } from '@/Services/Configuration.api';

export default function ConfigurationPage() {
  const [ip, setIP] = React.useState('');
  const [user, setUser] = React.useState('');
  const [psw, setPsw] = React.useState('');

  const saveBrocker = React.useCallback(async () => {
    const { error } = await configSystem(user, psw, ip);
    if (error) {
      alert('Error al guardar la configuración');
      return;
    }
    alert('Configuración guardada correctamente');
  }, [user, psw, ip]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="flex flex-col bg-gray-300 text-black text-center h-full items-center ">
        <h1 className="text-center text-4xl my-10">Configuración Broker</h1>
        <div className="flex flex-col p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl item-center ">
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            className="flex flex-col item-center w-full h-full"
            noValidate
            autoComplete="off">
            <TextField
              id="input-ip"
              label="Ip Broker"
              variant="outlined"
              value={ip}
              onChange={v => setIP(v.target.value)}
            />
            <TextField
              id="input-usr"
              label="Usuario"
              variant="outlined"
              value={user}
              onChange={v => setUser(v.target.value)}
            />
            <TextField
              id="input-psw"
              label="Password"
              variant="outlined"
              value={psw}
              onChange={v => setPsw(v.target.value)}
            />
            <Button
              className="bg-primary hover:bg-blue-700 ml-3"
              variant="contained"
              onClick={saveBrocker}>
              Guardar
            </Button>
          </Box>
        </div>
      </div>
    </LocalizationProvider>
  );
}
