'use client';

import moment from 'moment';
import useSWR from 'swr';

import { getNodesStates } from '../../Services/Nodos.api';
import DenseTable from '../components/DenseTable';
import MyButton from '../components/inputs/PrimaryButton';
import Loader from '../components/Loader';

async function getNodesInformation() {
  const response = await getNodesStates();
  return { data: response.data.data, error: response.error };
}

const tableHeader = [
  'Id',
  'Nombre',
  'Estado',
  'Señal',
  'Tipo',
  'Estado de sincornización',
  'Hora',
  'IP',
];

export default function InfoPage() {
  const { data, error, isValidating, mutate } = useSWR(
    'nodes_table',
    getNodesInformation,
  );

  const formatData = d => {
    if (!d) return [];
    return d.map(item => ({
      ...item,
      time: moment(item.time).format('HH:mm:ss'),
    }));
  };

  const loading = isValidating || (!data && !error);

  return (
    <div className="flex flex-1 flex-col h-full pb-5">
      <h1 className="text-center text-4xl text-white mt-10">Estado de nodos</h1>
      <div className="ml-10">
        <MyButton onClick={mutate} disabled={loading} variant={'contained'}>
          Actualizar estados
        </MyButton>
      </div>

      <div className="flex flex-col w-full h-full m-5 mt-10">
        <DenseTable
          data={formatData(data?.data)}
          tableHeader={tableHeader}
          loading={loading}
        />
        <Loader loading={true} />
      </div>
    </div>
  );
}
