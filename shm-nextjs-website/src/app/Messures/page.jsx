'use client';
import * as React from 'react';
import { Button, CircularProgress, Switch, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

import { cancelMeasure, initMeasure } from '@/Services/Measures.api';

import theme from '../../styles/mui-theme';
import MyRadioGroup from '../components/inputs/MyRadioGroup';
import MyTextfield from '../components/inputs/MyTextfield';

export default function MessurePage() {
  const [time, setTime] = React.useState(moment());
  const [day, setDay] = React.useState(moment());
  const [deleteDay, setDeleteDay] = React.useState(moment());
  const [nDelMeasure, setDelNmeasure] = React.useState(1);

  const [relativeTimeUnit, setRelativeTimeUnit] = React.useState('m');
  const [nMeasure, setNmeasure] = React.useState(1);
  const [relativeTime, setRelativeTime] = React.useState(5);
  const [duration, setDuration] = React.useState(1);
  const [durationUnit, setDurationUnit] = React.useState('m');
  const [timeFormat, setTimeFormat] = React.useState('relative');
  const [sync, setSync] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const formatStartTime = (type, data) => {
    if (type === 'relative') {
      return moment().add(data.relativeTime, data.relativeTimeUnit).unix();
    } else {
      const tformat = moment(time).format('hh:mm:ss');
      const dformat = moment(day).format('YYYY-MM-DD');
      return moment(`${dformat} ${tformat}`).unix();
    }
  };

  const unitsOptions = [
    { value: 's', label: 'Segundos' },
    { value: 'm', label: 'Minutos' },
    { value: 'h', label: 'Horas' },
  ];

  const handleMakeMeasure = React.useCallback(async () => {
    const today = moment().format('YYYYMMDD');
    const startTime = sync
      ? formatStartTime(timeFormat, {
          relativeTime,
          relativeTimeUnit,
          time,
          day,
        })
      : undefined;
    const payload = {
      id: today + '-' + nMeasure,
      duration,
      sync,
      startTime,
    };

    setLoading(true);

    const { error } = await initMeasure(payload);

    if (error) {
      console.log(error);
    }
    setLoading(false);
  }, [
    duration,
    durationUnit,
    nMeasure,
    sync,
    timeFormat,
    day,
    time,
    relativeTime,
    relativeTimeUnit,
  ]);

  const handleCancelMeasure = React.useCallback(async () => {
    setLoading(false);

    const { error } = await cancelMeasure();
    if (error) {
      console.log('error');
      return;
    }
    setLoading(false);
  }, []);

  const handleSetnMeasure = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;
    setNmeasure(newValue);
  };
  const handleSetnDelMeasure = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;
    setDelNmeasure(newValue);
  };

  const handleDurationUnit = event => {
    setDurationUnit(event.target.value);
  };

  const handleChangeRelativeTimeUnit = event => {
    setRelativeTimeUnit(event.target.value);
  };
  const handleSetMeasureDuration = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;
    setDuration(newValue);
  };

  const handleChangeTimeFormat = event => {
    setTimeFormat(event.target.value);
  };

  const handleChangeRelativeTime = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;

    setRelativeTime(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="flex flex-col flex-1 p-5 bg-gray-300">
          <h1 className="text-center text-4xl">Control de mediciones</h1>
          {loading && (
            <div className="flex flex-1 p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl item-center">
              <CircularProgress size={64} color="primary" />
              {loading && (
                <Button onClick={handleCancelMeasure} className="mt-10">
                  Cancelar
                </Button>
              )}
            </div>
          )}
          {!loading && (
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
                      value={nDelMeasure}
                      onChange={handleSetnDelMeasure}
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
                  <div className="flex">
                    <MyTextfield
                      type="number"
                      id="outlined-basic"
                      label="duración de la medicion"
                      variant="outlined"
                      onChange={handleSetMeasureDuration}
                      value={duration}
                    />
                    <div className="ml-5">
                      <MyRadioGroup
                        title={'Unidad duración'}
                        options={unitsOptions}
                        value={durationUnit}
                        onChange={handleDurationUnit}
                      />
                    </div>
                  </div>

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
                  )}
                </Box>
                <Button
                  onClick={handleMakeMeasure}
                  className="!mt-5 bg-primary hover:bg-blue-700"
                  variant="contained">
                  Iniciar medición
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
                      value={nMeasure}
                      onChange={handleSetnMeasure}
                    />
                  </div>
                  <DatePicker
                    color="primary"
                    label="Fecha de la medición"
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
      </LocalizationProvider>
    </ThemeProvider>
  );
}
