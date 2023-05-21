'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'

export default function ConfigurationPage () {
  const [value, setValue] = React.useState(moment())

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>

    <div>
      <h1>Configuracion Broker</h1>

      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete="off"
    >

      <TextField id="outlined-basic" label="Outlined" variant="outlined" />

    </Box>
    </div>
    </LocalizationProvider>
  )
}
