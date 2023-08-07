'use client';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { Button, Fade, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useAppContext } from '@/contexts/appContext';
import { configSystem } from '@/Services/Configuration.api';
import { eraseSD } from '@/Services/Data.api';
import { cancelMeasure } from '@/Services/Measures.api';
import { restartNodes } from '@/Services/Nodos.api';
import ConfirmationDialog from '../components/ConfirmationDialog';

export default function ConfigurationPage() {
  const [ip, setIP] = React.useState('');
  const [user, setUser] = React.useState('');
  const [psw, setPsw] = React.useState('');
  const { currentTimeOutId, cleanMeasureState } = useAppContext();

  const [dialogConfig, setDialogConfig] = React.useState({
    open: false,
    title: '',
    bodyText: '',
  });

  const saveBrocker = React.useCallback(async () => {
    const { error } = await configSystem(user, psw, ip);
    if (error) {
      toast.error('Error al guardar la configuración');
      return;
    }
    toast.success('Configuración guardada correctamente');
  }, [user, psw, ip]);

  const handleCancelMeasure = React.useCallback(async () => {
    cleanMeasureState();

    const { error } = await cancelMeasure();
    if (error) {
      console.log('error');
      return;
    }

    currentTimeOutId && clearTimeout(currentTimeOutId);
  }, []);

  const handleCleanSD = React.useCallback(async () => {
    const { error } = await eraseSD();
    if (error) {
      toast.error('Error al borrar la sd');
      return;
    }
    toast.success('Tarjetas SD borradas correctamente');
  }, [user, psw, ip]);

  const handleResetNodes = React.useCallback(async () => {
    const { error } = await restartNodes();
    if (error) {
      toast.error('Error al reinciar los nodos');
      return;
    }
    toast.success('Nodos reiniciados correctamente');
  }, []);

  const openResetNodesDialog = React.useCallback(() => {
    setDialogConfig({
      open: true,
      title: 'Reiniciar nodos',
      bodyText:
        'Al reiniciar los nodos se perdera el sincronismo de los mismos',
      onAccept: handleResetNodes,
      onClose: () => setDialogConfig({ open: false }),
    });
  }, [handleResetNodes]);

  const openCleanSDDialog = React.useCallback(() => {
    setDialogConfig({
      open: true,
      title: 'Borrar tarjetas SD',
      bodyText: '¿Está seguro que desea borrar las tarjetas SD?',
      onAccept: handleCleanSD,
      onClose: () => setDialogConfig({ open: false }),
    });
  }, [handleCleanSD]);

  const openCancelMeasureDialog = React.useCallback(() => {
    setDialogConfig({
      open: true,
      title: 'Cancelar mediciones',
      bodyText: '¿Está seguro que desea cancelar las mediciones?',
      onAccept: handleCancelMeasure,
      onClose: () => setDialogConfig({ open: false }),
    });
  }, [handleCancelMeasure]);

  return (
    <div className="flex flex-col bg-gray-300 text-black text-center h-full items-center ">
      <h1 className="text-center text-4xl my-10">Configuración</h1>
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
      <div className="flex flex-col p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl item-center ">
        <h1 className="text-center text-2xl mb-5">Acciones de emergencia</h1>
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="Al reiniciar los nodos se perdera el sincronismo de los mismos">
          <Button
            className="bg-primary hover:bg-blue-700"
            variant="contained"
            onClick={openResetNodesDialog}>
            Reiniciar nodos
          </Button>
        </Tooltip>
        <Button
          className="bg-primary hover:bg-blue-700 !mt-5"
          variant="contained"
          onClick={openCancelMeasureDialog}>
          Cancelar mediciones
        </Button>
        <Button
          className="bg-primary hover:bg-blue-700 !mt-5"
          variant="contained"
          onClick={openCleanSDDialog}>
          Borrar tarjetas SD
        </Button>
      </div>
      <ConfirmationDialog {...dialogConfig} />
    </div>
  );
}
