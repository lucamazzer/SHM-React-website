'use client';
import * as React from 'react';
import toast from 'react-hot-toast';
import { Button, CircularProgress, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

import { useAppContext } from '@/contexts/appContext';
import {
  cancelMeasure,
  getMeasureStatus,
  initMeasure,
} from '@/Services/Measures.api';

import MyTextfield from '../components/inputs/MyTextfield';

export default function MessurePage() {
  const [deleteDay, setDeleteDay] = React.useState(moment());
  const [nDelMeasure, setDelNmeasure] = React.useState(1);

  const [nMeasure, setNmeasure] = React.useState(1);
  const [sync, setSync] = React.useState(true);
  const [duration, setDuration] = React.useState(1);

  // const [relativeTime, setRelativeTime] = React.useState(1);
  // const [durationUnit, setDurationUnit] = React.useState('m');
  // const [time, setTime] = React.useState(moment());
  // const [day, setDay] = React.useState(moment());
  // const [relativeTimeUnit, setRelativeTimeUnit] = React.useState('m');
  // const [timeFormat, setTimeFormat] = React.useState('relative');

  const { measureInProgress, setMeasureInProgress } = useAppContext();

  // const formatStartTime = (type, data) => {
  //   if (type === 'relative') {
  //     return moment().add(data.relativeTime, data.relativeTimeUnit).unix();
  //   } else {
  //     const tformat = moment(time).format('hh:mm:ss');
  //     const dformat = moment(day).format('YYYY-MM-DD');
  //     return moment(`${dformat} ${tformat}`).unix();
  //   }
  // };

  // const unitsOptions = [
  //   { value: 's', label: 'Segundos' },
  //   { value: 'm', label: 'Minutos' },
  //   { value: 'h', label: 'Horas' },
  // ];

  const handleMakeMeasure = React.useCallback(async () => {
    const today = moment().format('YYYYMMDD');
    // const startTime = sync
    //   ? formatStartTime(timeFormat, {
    //       relativeTime,
    //       relativeTimeUnit,
    //       time,
    //       day,
    //     })
    //   : undefined;

    const startTime = sync ? moment().add(1, 'm').unix() : undefined;

    const timeout = duration * 60000 + 1 * 60000 + 60000;

    const payload = {
      // id: today + '-' + nMeasure,
      id: nMeasure,
      duration,
      sync,
      startTime,
      timeout,
    };

    setMeasureInProgress(true);

    const { error: measureStateError, data } = await getMeasureStatus(sync);

    if (measureStateError || data.status !== 'ok') {
      setMeasureInProgress(false);

      toast.error(
        measureStateError?.message || data?.error || 'error estado nodos',
      );

      return;
    }

    const { error } = await initMeasure(payload);

    if (error) {
      console.log(error);
      toast.error(error.message);
    }
    setMeasureInProgress(false);
  }, [duration, nMeasure, sync]);

  const handleCancelMeasure = React.useCallback(async () => {
    setMeasureInProgress(false);

    const { error } = await cancelMeasure();
    if (error) {
      console.log('error');
      return;
    }
    setMeasureInProgress(false);
  }, []);

  const handleSetnMeasure = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;
    setNmeasure(newValue);
  };
  const handleSetnDelMeasure = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;
    setDelNmeasure(newValue);
  };

  const handleSetMeasureDuration = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;
    setDuration(newValue);
  };

  // const handleDurationUnit = event => {
  //   setDurationUnit(event.target.value);
  // };

  /*

  // DESCOMENTAR CUANDO SE INTEGRE INCIO PROGRAMADO.

  const handleChangeRelativeTimeUnit = event => {
    setRelativeTimeUnit(event.target.value);
  };
 

  const handleChangeTimeFormat = event => {
    setTimeFormat(event.target.value);
  };

  const handleChangeRelativeTime = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;

    setRelativeTime(newValue);
  };

  */

  return (
    <div className="flex flex-col flex-1 p-5 bg-gray-300">
      <h1 className="text-center text-4xl">Control de mediciones</h1>
      {measureInProgress && (
        <div className="flex flex-1 flex-col p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl item-center">
          <CircularProgress size={64} color="primary" />
          <Button onClick={handleCancelMeasure} className="mt-10">
            Cancelar
          </Button>
        </div>
      )}
      {!measureInProgress && (
        <div className="flex justify-center">
          <div className="flex flex-col p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl item-center mr-5">
            <h1 className="text-center text-2xl">Realizar una medición</h1>
            <Box
              component="form"
              className="flex  flex-col"
              noValidate
              autoComplete="off">
              <div className="flex items-center my-5">
                <MyTextfield
                  type="number"
                  id="id-medicion"
                  label="Nombre de la medicion"
                  variant="outlined"
                  required
                  value={nMeasure}
                  onChange={e => handleSetnMeasure(e)}
                />
              </div>
              <div className="flex mb-5 items-center">
                <h1 className="text-primary font-medium">
                  Medición sincronizada?
                </h1>
                <Switch
                  checked={sync}
                  onChange={e => setSync(e.target.checked)}
                  color="primary"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-primary font-medium mb-4">
                  Duracion de la medición en minutos
                </h1>
                <MyTextfield
                  type="number"
                  id="outlined-basic"
                  label="duración de la medicion"
                  variant="outlined"
                  onChange={handleSetMeasureDuration}
                  value={duration}
                />
                {/* <div className="ml-5">
                      <MyRadioGroup
                        title={'Unidad duración'}
                        options={unitsOptions}
                        value={durationUnit}
                        onChange={handleDurationUnit}
                      />
                    </div> */}
              </div>
              {/* 
                  {sync && (
                    <div className="flex flex-col	w-full mt-5">
                      <MyRadioGroup
                        title={
                          ' De que forma ingresa el tiempo de inicio de la medición?'
                        }
                        options={[
                          { value: 'relative', label: 'Relativo' },
                          { value: 'absolute', label: 'Fecha y hora' },
                        ]}
                        row
                        color="primary"
                        className="mb-5 mt-5"
                        value={timeFormat}
                        onChange={handleChangeTimeFormat}
                      />
                      {timeFormat === 'absolute' && (
                        <div className="flex w-full mt-5 items-center">
                          <DatePicker
                            color="primary"
                            value={day}
                            label="Fecha de incio de la medición"
                            onChange={newValue => setDay(newValue)}
                          />

                          <TimeField
                            label="Hora de inicio de la medición"
                            className="ml-5"
                            value={time}
                            color="primary"
                            onChange={newValue => setTime(newValue)}
                          />
                        </div>
                      )}

                      {timeFormat === 'relative' && (
                        <div className="flex w-full">
                          <Box component="form" className="flex flex-1 w-full">
                            <MyTextfield
                              type="number"
                              className="!mr-10 w-900"
                              id="outlined-basic"
                              label="Inicio de la medicion en:"
                              variant="outlined"
                              onChange={handleChangeRelativeTime}
                              value={relativeTime}
                            />
                            <MyRadioGroup
                              title={'Unidad'}
                              options={unitsOptions}
                              value={relativeTimeUnit}
                              onChange={handleChangeRelativeTimeUnit}
                            />
                          </Box>
                        </div>
                      )}
                    </div>
                  )} */}
            </Box>
            <Button
              onClick={handleMakeMeasure}
              className="!mt-5 bg-primary hover:bg-blue-700"
              variant="contained">
              Iniciar medición
            </Button>
            <Button
              onClick={handleCancelMeasure}
              className="!mt-5 bg-primary hover:bg-blue-700"
              variant="contained">
              Cancelar medición
            </Button>
          </div>
          <div className="flex flex-col p-5 mt-5 items-center bg-gray-200 border-2 border-primary rounded-2xl item-center ">
            <h1 className="text-center text-2xl">Borrar mediciones</h1>
            <Box
              component="form"
              className="flex  flex-col"
              noValidate
              autoComplete="off">
              <div className="flex items-center my-5">
                <MyTextfield
                  type="number"
                  id="id-medicion"
                  label="Nombre de la medicion"
                  variant="outlined"
                  required
                  value={nDelMeasure}
                  onChange={handleSetnDelMeasure}
                />
              </div>
              <DatePicker
                color="primary"
                label="Fecha de la medición"
                required
                value={deleteDay}
                onChange={newValue => setDeleteDay(newValue)}
              />
            </Box>

            <Button
              onClick={() => {}}
              className="!mt-5 bg-primary hover:bg-blue-700"
              variant="contained">
              Borrar medicion
            </Button>
            <Button
              onClick={() => {}}
              className="!mt-5 bg-primary hover:bg-blue-700"
              variant="contained">
              Borrar todo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
