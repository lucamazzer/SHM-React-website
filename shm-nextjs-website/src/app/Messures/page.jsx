'use client';
import * as React from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

import { cancelMeasure, initMeasure } from '@/Services/Measures.api';

export default function MessurePage() {
  const [time, setTime] = React.useState(moment());
  const [day, setDay] = React.useState(moment());
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
      // id: today + '-' + nMeasure,
      id: nMeasure,
      duration,
      sync,
      startTime,
    };
    console.log(payload);
    setLoading(true);

    const { data, error } = await initMeasure(payload);

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
    const { data, error } = await cancelMeasure();
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

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="bg-white w-full text-black h-full p-5">
        <h1 className="text-center text-4xl">Control de mediciones</h1>
        {loading && (
          <div className="flex flex-1 h-full flex-col items-center justify-center">
            <CircularProgress size={64} />
            {loading && (
              <Button onClick={handleCancelMeasure} className="mt-10">
                Cancelar
              </Button>
            )}
          </div>
        )}
        {!loading && (
          <Box
            component="form"
            className="flex flex-col item-center w-full h-full"
            noValidate
            autoComplete="off">
            <div className="flex items-center my-5">
              <TextField
                type="number"
                id="id-medicion"
                label="Nombre de la medicion"
                variant="outlined"
                required
                value={nMeasure}
                onChange={handleSetnMeasure}
              />
            </div>
            <div className="flex items-center my-5">
              <h1>Sync?</h1>
              <Switch
                checked={sync}
                onChange={e => setSync(e.target.checked)}
                className="text-black"
              />
            </div>
            <Box component="form">
              <TextField
                type="number"
                id="outlined-basic"
                label="duración de la medicion"
                variant="outlined"
                onChange={handleSetMeasureDuration}
                value={duration}
              />
              <FormControl className="!ml-10">
                <FormLabel id="relative-unit-form">Unidad duración</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={durationUnit}
                  onChange={handleDurationUnit}>
                  <FormControlLabel
                    value="s"
                    control={<Radio />}
                    label="Segundos"
                  />
                  <FormControlLabel
                    value="m"
                    control={<Radio />}
                    label="Minutos"
                  />
                  <FormControlLabel
                    value="h"
                    control={<Radio />}
                    label="Horas"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {sync && (
              <div className="flex flex-col	 w-full mt-5">
                <FormControl className="w-full">
                  <FormLabel id="time-format-form">
                    De que forma ingresa el tiempo de inicio de la medición?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="time-format-group"
                    className="py-5"
                    value={timeFormat}
                    onChange={handleChangeTimeFormat}
                    row>
                    <FormControlLabel
                      value="relative"
                      control={<Radio />}
                      label="Relativo"
                    />
                    <FormControlLabel
                      value="absolute"
                      control={<Radio />}
                      label="Fecha y hora"
                    />
                  </RadioGroup>
                </FormControl>
                {timeFormat === 'absolute' && (
                  <div className="flex  w-full mt-5 items-center">
                    <DatePicker
                      value={day}
                      onChange={newValue => setDay(newValue)}
                    />
                    {/* <StaticTimePicker
                      label="Controlled picker"
                      value={time}
                      onChange={newValue => setTime(newValue)}
                    /> */}
                    <TimeField
                      label="Hora de inicio de la medicion"
                      className="ml-5"
                      value={time}
                      onChange={newValue => setTime(newValue)}
                    />
                  </div>
                )}

                {timeFormat === 'relative' && (
                  <div className="flex w-full">
                    <Box component="form" className="flex flex-1 w-full">
                      <TextField
                        type="number"
                        className="!mr-10 w-900"
                        id="outlined-basic"
                        label="Inicio de la medicion en:"
                        variant="outlined"
                        onChange={e => setRelativeTime(e.target.value)}
                        value={relativeTime}
                      />
                      <FormControl>
                        <FormLabel id="relative-unit-form">Unidad</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={relativeTimeUnit}
                          onChange={handleChangeRelativeTimeUnit}>
                          <FormControlLabel
                            value="s"
                            control={<Radio />}
                            label="Segundos"
                          />
                          <FormControlLabel
                            value="m"
                            control={<Radio />}
                            label="Minutos"
                          />
                          <FormControlLabel
                            value="h"
                            control={<Radio />}
                            label="Horas"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </div>
                )}
              </div>
            )}
          </Box>
        )}
        {!loading && <Button onClick={handleMakeMeasure}>Start</Button>}{' '}
      </div>
    </LocalizationProvider>
  );
}
