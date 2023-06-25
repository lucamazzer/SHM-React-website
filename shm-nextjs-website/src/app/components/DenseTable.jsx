import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const DenseTable = ({ data, tableHeader, loading }) => {
  const TableHeader = () => (
    <TableHead>
      <TableRow>
        {tableHeader.map(head => (
          <TableCell key={head} className="!text-white">
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
  if (!data || data.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <TableHeader />
        {!loading && (
          <h1 className="text-white text-4xl	mt-10 ">No hay datos</h1>
        )}
      </div>
    );

  return (
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      {<TableHeader />}
      <TableBody>
        {data.map(row => {
          const keys = Object.keys(row);
          return (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {keys.map(key => (
                <TableCell className="!text-white" key={`${row.id}_${key}`}>
                  {row[`${key}`]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DenseTable;
