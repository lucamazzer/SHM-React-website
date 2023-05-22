'use client'
import * as React from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'

import { initMeasure } from '@/Services/Measures.api'

export default function MessurePage () {
  const [time, setTime] = React.useState(moment())
  const [day, setDay] = React.useState(moment())
  const [relativeTimeUnit, setRelativeTimeUnit] = React.useState('m')
  const [nMeasure, setNmeasure] = React.useState('')
  const [relativeTime, setRelativeTime] = React.useState(5)
  const [duration, setDuration] = React.useState(1)
  const [durationUnit, setDurationUnit] = React.useState('m')
  const [timeFormat, setTimeFormat] = React.useState('relative')
  const [sync, setSync] = React.useState(true)

  const formatStartTime = (type) => {
    if (type === 'relative') {
      return relativeTime
    } else {
      return ''
    }
  }

  const handleMakeMeasure = React.useCallback(async () => {
    const today = moment().format('YYYYMMDD')

    const payload = {
      id: today + '-' + nMeasure,
      duration,
      durationUnit,
      sync,
      startTime: sync ? formatStartTime(timeFormat) : undefined
    }
    const { data, error } = await initMeasure(payload)

    if (error) {
      console.log(error)
    }
  }
  , [duration, durationUnit, nMeasure, sync, timeFormat, relativeTime])

  const handleSetnMeasure = (event) => {
    setNmeasure(event.target.value)
  }

  const handleDurationUnit = (event) => {
    setDurationUnit(event.target.value)
  }

  const handleChangeRelativeTimeUnit = (event) => {
    setRelativeTimeUnit(event.target.value)
  }

  const handleChangeTimeFormat = (event) => {
    setTimeFormat(event.target.value)
  }

  return (
      <LocalizationProvider dateAdapter={AdapterMoment}>

      <div className='bg-white w-full text-black'>
          <h1 className="text-center text-4xl">Control de mediciones</h1>

          <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' }
          }}
          noValidate
          className='flex w-full'
          autoComplete="off"
          >
            <div className='w-full'>
              <TextField type="number" fullWidth id="id-medicion" label="Nombre de la medicion" variant="outlined" className='bg-white' value={nMeasure} onChange={handleSetnMeasure}/>
                <div className='flex items-center'>
                  <h1>Sync?</h1>
                  <Switch
                      checked={sync}
                      onChange={e => setSync(e.target.checked)}
                      className='text-black'
                    />
                </div>
            <div>
          <Box component="form">
          <TextField
            type="number"
            id="outlined-basic"
            label="duración de la medicion"
            variant="outlined"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
          <FormControl>
                <FormLabel id="relative-unit-form">Unidad duracion</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={durationUnit}
                  onChange={handleDurationUnit}
                >
                  <FormControlLabel value="s" control={<Radio />} label="Segundos" />
                  <FormControlLabel value="m" control={<Radio />} label="Minutos" />
                  <FormControlLabel value="h" control={<Radio />} label="Horas" />
                </RadioGroup>
          </FormControl>
      </Box>

        </div>

    { sync && <div className='mt-5'>
          <FormControl>
              <FormLabel id="time-format-form">De que forma ingresa el tiempo de inicio de la medición?</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="time-format-group"
                  value={timeFormat}
                  onChange={handleChangeTimeFormat}
                  row
                >
                  <FormControlLabel value="relative" control={<Radio />} label="Relativo" />
                  <FormControlLabel value="absolute" control={<Radio />} label="Fecha y hora" />
                </RadioGroup>
          </FormControl>
           { timeFormat === 'absolute' && (<div className='w-500 bg-white'>
            <DatePicker className='flex mt-5' value={day}
              onChange={(newValue) => setDay(newValue)}/>
            <StaticTimePicker
              label="Controlled picker"
              value={time}
              onChange={(newValue) => setTime(newValue)}
            />
            </div>)}

        { timeFormat === 'relative' && <div>
            <Box component="form">
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Inicio de la medicion en:"
                  variant="outlined"
                  onChange={(e) => setRelativeTime(e.target.value)}
                  value={relativeTime}
                />
                <FormControl>
                    <FormLabel id="relative-unit-form">Unidad</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={relativeTimeUnit}
                      onChange={handleChangeRelativeTimeUnit}
                    >
                      <FormControlLabel value="s" control={<Radio />} label="Segundos" />
                      <FormControlLabel value="m" control={<Radio />} label="Minutos" />
                      <FormControlLabel value="h" control={<Radio />} label="Horas" />
                    </RadioGroup>
                </FormControl>
            </Box>

          </div>
        }
       </div>}

        </div>
      </Box>
      </div>
      </LocalizationProvider>
  )
}
