'use client'

import useSWR from 'swr'

import { getNodesStates } from '../../Services/Nodos.api'
import DenseTable from '../components/DenseTable'

async function getNodesInformation () {
  const response = await getNodesStates()
  return { data: response.data.data, error: response.error }
}

const headersMapper = {
  id: 'ID',
  name: 'Nombre',
  state: 'Estado',
  rssi: 'RSSI',
  type: 'Tipo',
  sync: 'Estado de sincornización',
  time: 'Hora',
  ip: 'IP'
}

export default function InfoPage () {
  const { data, error } = useSWR('nodes_table', getNodesInformation)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div className='pb-5'>
      <h1>Estado de nodos</h1>
      <div className='m-5'>
         <DenseTable data={data.data} headersMapper={headersMapper} />
      </div>
    </div>
  )
}
