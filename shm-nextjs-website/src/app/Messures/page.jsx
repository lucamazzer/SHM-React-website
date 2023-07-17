'use client';
import * as React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import toast from 'react-hot-toast';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button, CircularProgress, Fade, Switch, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

import { useAppContext } from '@/contexts/appContext';
import {
  deleteAllMeasure,
  deleteMeasure,
  generateCsv,
} from '@/Services/Data.api';
import {
  cancelMeasure,
  getMeasureStatus,
  initMeasure,
} from '@/Services/Measures.api';

import MyTextfield from '../components/inputs/MyTextfield';
import { delay } from '../utils';

export default function MessurePage() {
  const [deleteDay, setDeleteDay] = React.useState(moment());
  const [nDelMeasure, setDelNmeasure] = React.useState(1);

  const [nMeasure, setNmeasure] = React.useState(1);
  const [sync, setSync] = React.useState(true);
  const [duration, setDuration] = React.useState(1);

  const [enableCancel, setEnableCancel] = React.useState(true);
  const [timer, setTimer] = React.useState(0);
  const [comment, setComment] = React.useState('');

  // const [relativeTime, setRelativeTime] = React.useState(1);
  // const [durationUnit, setDurationUnit] = React.useState('m');
  // const [time, setTime] = React.useState(moment());
  // const [day, setDay] = React.useState(moment());
  // const [relativeTimeUnit, setRelativeTimeUnit] = React.useState('m');
  // const [timeFormat, setTimeFormat] = React.useState('relative');

  const shouldUseEffect = React.useRef(true);

  const {
    measureInProgress,
    setMeasureInProgress,
    loadingMessage,
    setLoadingMessage,
    currentTimeOutId,
    setCurrentTimeOutId,
    showClock,
    setShowClock,
    cleanMeasureState,
  } = useAppContext();

  const checkMeasureIsInProgress = React.useCallback(async () => {
    const { error: measureStateError, data } = await getMeasureStatus(sync);

    if (measureStateError || data.status !== 'measureInProgress') {
      return;
    }
    setLoadingMessage('Medición en progreso...');
    setMeasureInProgress(true);
    setEnableCancel(true);
    const timeLeft = (Number(data?.data?.[0]?.tLeft || 0) * 100) / 100;

    setTimer(timeLeft);
    const timeoutMeasure = timeLeft * 1000;

    const timeoutId = setTimeout(async () => {
      setLoadingMessage('descargando datos...');
      setShowClock(false);
      await delay(20000);
      setTimer(0);
      setMeasureInProgress(false);
    }, timeoutMeasure);
    setCurrentTimeOutId(timeoutId);
  }, [sync]);

  React.useEffect(() => {
    if (shouldUseEffect.current) {
      checkMeasureIsInProgress();
      shouldUseEffect.current = false;
    }
  }, []);

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

    // const startTime = sync ? moment().add(1, 'm').unix() : undefined; // como la hra de la raspi y el local es distinto hay q mandar el relativo.

    const timeout = duration * 60000 + 1 * 60000 + 60000;

    const payload = {
      // id: today + '-' + ('00' + nMeasure).slice(-3),
      id: ('00' + nMeasure).slice(-3),
      duration,
      sync,
      startTime: sync ? 1 : undefined,
      timeout,
      comment,
    };

    setEnableCancel(false);
    setLoadingMessage('Verificando estado de los nodos...');
    setMeasureInProgress(true);

    const { error: measureStateError, data } = await getMeasureStatus(
      sync,
      payload.id,
    );

    if (measureStateError || data.status !== 'ok') {
      const measureInProgress = data?.status === 'measureInProgress';
      if (measureInProgress) {
        setMeasureInProgress(measureInProgress);
        setEnableCancel(measureInProgress);
        setShowClock(true);
        const timeLeft = (Number(data?.data?.[0]?.tLeft || 0) * 100) / 100;
        setTimer(timeLeft);
        setLoadingMessage('Medición en progreso...');
        const timeoutMeasure = timeLeft * 1000;
        const timeoutId = setTimeout(async () => {
          setLoadingMessage('descargando datos...');
          setShowClock(false);
          await delay(20000);
          setTimer(0);
          setMeasureInProgress(false);
        }, timeoutMeasure);
        setCurrentTimeOutId(timeoutId);
      } else {
        setMeasureInProgress(false);
      }
      toast.error(
        measureStateError?.message || data?.error || 'error estado nodos',
      );

      return;
    }

    setLoadingMessage('Iniciando Medición...');
    const { error } = await initMeasure(payload);

    if (error) {
      console.log(error);
      setMeasureInProgress(false);
      toast.error(error.message);
    }

    setEnableCancel(true);
    sync && setLoadingMessage('Esperando Hora de inicio...');
    sync && (await delay(55000)); // espero 1 minuto

    const timeoutMeasure = duration * 60000;
    setTimer(timeoutMeasure / 1000);

    setLoadingMessage('Midiendo...');
    setShowClock(true);

    const timeoutId = setTimeout(async () => {
      setLoadingMessage('descargando datos...');
      setShowClock(false);
      await delay(20000);
      setTimer(0);
      setMeasureInProgress(false);
    }, timeoutMeasure);
    setCurrentTimeOutId(timeoutId);
  }, [duration, nMeasure, sync, comment]);

  const handleCancelMeasure = React.useCallback(async () => {
    cleanMeasureState();

    const { error } = await cancelMeasure();
    if (error) {
      console.log('error');
      return;
    }

    currentTimeOutId && clearTimeout(currentTimeOutId);
  }, []);

  const handleSetnMeasure = event => {
    const newValue =
      event.target.value < 1
        ? 1
        : event.target.value > 999
        ? 999
        : event.target.value;
    setNmeasure(newValue);
  };
  const handleSetnDelMeasure = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;
    setDelNmeasure(newValue);
  };

  const handleSetMeasureDuration = event => {
    const newValue =
      event.target.value < 1
        ? 1
        : event.target.value > 60
        ? 60
        : event.target.value;
    setDuration(newValue);
  };

  const handleSetComment = event => {
    setComment(event.target.value);
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
  const handleDeleteAllMeasure = React.useCallback(async () => {
    const { error } = await deleteAllMeasure();
    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }
    toast.success('Mediciones borradas');
  }, []);

  const handleDeleteMeasure = React.useCallback(async () => {
    const id = ('00' + nDelMeasure).slice(-3);

    const { error } = await deleteMeasure(id);
    if (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }
    toast.success('Medición borrada');
  }, [nDelMeasure]);

  const handleCreateCsvFiles = React.useCallback(async () => {
    const id = ('00' + nDelMeasure).slice(-3);

    const { error } = await generateCsv(id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Csv generado');
  }, [nDelMeasure]);

  // const handleGetMeasureData = React.useCallback(async () => {
  //   const id = ('00' + nDelMeasure).slice(-3);

  //   const { error } = await generateCsv(id);
  //   if (error) {
  //     toast.error(error.message);
  //     return;
  //   }
  //   toast.success('Recoleccion finalizada');
  // }, [nDelMeasure]);

  return (
    <div className="flex flex-col flex-1 p-5 bg-gray-300">
      <h1 className="text-center text-4xl">Control de mediciones</h1>
      {measureInProgress && (
        <div className="flex flex-1 flex-col p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl item-center">
          <h1 className="mb-5 text-2xl">{loadingMessage}</h1>
          {!showClock && <CircularProgress size={64} color="primary" />}

          {!!showClock && (
            <div>
              <CountdownCircleTimer
                isPlaying={showClock}
                duration={timer}
                colors={['#0095DA', '#0095DA', '#0095DA', '#0095DA']}>
                {({ remainingTime }) => (
                  <div className="flex flex-col items-center">
                    <h1 className="text-4xl text-primary">{remainingTime}</h1>
                    <h1 className="text-2xl text-primary">Segundos</h1>
                  </div>
                )}
              </CountdownCircleTimer>
            </div>
          )}

          {enableCancel && (
            <Button onClick={handleCancelMeasure} className="mt-10">
              Cancelar
            </Button>
          )}
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
                  label="Numero de la medición"
                  variant="outlined"
                  required
                  value={nMeasure}
                  onChange={e => handleSetnMeasure(e)}
                />
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  title="El nombre guardado de la medición sera en formato YYYYMMDD-NNN i.e: 20230606-001 correspondiente a la fecha del dia y a  l numero de medición">
                  <InfoOutlinedIcon className="ml-5" color="primary" />
                </Tooltip>
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
                  label="duración de la medición"
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
              <div className="flex flex-col mt-5">
                <h1 className="text-primary font-medium mb-4">
                  Comentarios (optional){' '}
                </h1>
                <MyTextfield
                  id="id-comment"
                  label="Comentarios de la medición"
                  variant="outlined"
                  multiline
                  onChange={handleSetComment}
                  value={comment}
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
            </Box>
            <Button
              onClick={handleMakeMeasure}
              className="!mt-5 bg-primary hover:bg-blue-700"
              variant="contained">
              Iniciar medición
            </Button>
            {/* <Button
              onClick={handleCancelMeasure}
              className="!mt-5 bg-primary hover:bg-blue-700"
              variant="contained">
              Cancelar medición
            </Button> */}
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
                  label="Numero de la medición"
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
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Una vez borrada medición no podra ser recuperada">
              <Button
                onClick={handleDeleteMeasure}
                className="!mt-5 bg-primary hover:bg-blue-700"
                variant="contained">
                Borrar medición
              </Button>
            </Tooltip>

            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Se borraran todas las mediciones y no podran ser recuperadas">
              <Button
                onClick={handleDeleteAllMeasure}
                className="!mt-5 bg-primary hover:bg-blue-700"
                variant="contained">
                Borrar todo
              </Button>
            </Tooltip>
            <Tooltip
              TransitionComponent={Fade}
              className="flex items-center"
              TransitionProps={{ timeout: 600 }}
              title="Los archivos deberian estar ya creados una vez finalizada la medición, esta opcion debe ser utilizada solo si fallo por alguna razon.">
              <Button
                onClick={handleCreateCsvFiles}
                className="!mt-5 bg-primary hover:bg-blue-700"
                variant="contained">
                Generar csv
              </Button>
            </Tooltip>
            {/* <Button
              onClick={handleGetMeasureData}
              className="!mt-5 bg-primary hover:bg-blue-700"
              variant="contained">
              Recolectar archivos
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
}
