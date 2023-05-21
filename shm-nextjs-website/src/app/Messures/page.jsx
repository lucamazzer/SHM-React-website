'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimeClock } from '@mui/x-date-pickers/TimeClock'
import moment from 'moment'

export default function MessurePage () {
  const [value, setValue] = React.useState(moment())

  return (
      <LocalizationProvider dateAdapter={AdapterMoment}>

      <div className='bg-white'>
        <h1>Control de mediciones</h1>

        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <div className='border-red-900'>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" className='bg-white'/>
          <DatePicker />
          <TimeClock defaultValue={moment('2022-04-17T15:30')} ampm={false} />
        </div>
      </Box>
      </div>
      </LocalizationProvider>
  )
}
