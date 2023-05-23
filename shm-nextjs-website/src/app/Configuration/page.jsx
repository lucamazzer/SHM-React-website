'use client';
import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function ConfigurationPage() {
  const [ip, setIP] = React.useState('');
  const [user, setUser] = React.useState('');
  const [psw, setPsw] = React.useState('');

  const saveBrocker = React.useCallback(async () => {}, []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="bg-white text-black">
        <h1>Configuracion Broker</h1>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="flex w-full flex-col">
          <TextField
            id="input-ip"
            label="Ip Broker"
            variant="outlined"
            value={ip}
            onChange={v => setIP(v.target.value)}
          />
          s
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
        </Box>
        <Button
          className="bg-blue-400 text-white hover:bg-sky-700"
          onClick={saveBrocker}>
          Guardar
        </Button>
      </div>
    </LocalizationProvider>
  );
}
