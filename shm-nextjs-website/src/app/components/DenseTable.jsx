import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const DenseTable = ({ data, headersMapper }) => {
  if (!data || data.length === 0) return (<div>No data</div>)
  const header = Object.keys(data[0])
  return (
    <TableContainer component={Paper} className='bg-white-500'>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className='bg-white'>
        <TableHead>
          <TableRow>
            {header.map((head) => (
                <TableCell key={head} className='text-white'>{headersMapper ? headersMapper[head] : head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const keys = Object.keys(row)
            return (

            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             {keys.map((key) => (
                <TableCell className='text-white' key={`${row.id}_${key}`}>{row[`${key}`]}</TableCell>
             ))}
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DenseTable
