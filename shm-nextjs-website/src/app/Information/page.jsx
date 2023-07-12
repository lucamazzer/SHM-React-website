'use client';

import React, { useMemo, useState } from 'react';
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
  'IP',
  'Señal',
  'Tipo',
  'Estado de sincornización',
  'Hora interna',
  'Estado',
  'N Medición',
  'Tiempo restante [s]',
];
const stateMapper = {
  standby: 'Listo',
  muestreando: 'Midiendo',
  esperando_hora_inicio: 'Esperando para iniciar',
};

const syncMapper = {
  sincronizado: 'Sincronizado',
  no_sincronizado: 'No sincronizado',
};

const typeMapper = {
  nodo_acelerometro: 'Acelerómetro',
};

const formatRssi = rssi => {
  if (rssi > -50) return 'Excelente';
  if (rssi > -60) return 'Bueno';
  if (rssi > -70) return 'Regular';
  if (rssi > -85) return 'Malo';
  return 'Muy malo';
};

export default function InfoPage() {
  const [date, setDate] = useState(null);
  const { data, error, isValidating, mutate } = useSWR(
    'nodes_table',
    async () => {
      const { data, error } = await getNodesInformation();
      setDate(moment().format('DD/MM/YYYY HH:mm:ss'));
      console.log(data);

      return { data, error };
    },
  );

  const formatData = d => {
    if (!d) return [];

    const uniqueData = [...new Set(d.map(item => item.id))].map(id => {
      const filtered = d.filter(item => item.id === id);
      const last = filtered[filtered.length - 1];
      return last;
    });

    return uniqueData?.map(item => ({
      ...item,
      time: moment(Number(item.time)).format('HH:mm:ss'),
      state: stateMapper[item.state],
      type: typeMapper[item.type],
      sync: syncMapper[item.sync],
      name: item.name === 'no_muestreando' ? '-' : item.name,
      rssi: formatRssi(item.rssi),
    }));
  };

  const loading = useMemo(
    () => isValidating || (!data && !error),
    [data, isValidating, error],
  );

  return (
    <div className="flex flex-1 flex-col pb-5">
      <h1 className="text-center text-4xl text-white mt-10">Estado de nodos</h1>
      <div className="ml-10">
        <MyButton onClick={mutate} disabled={loading} variant={'contained'}>
          Actualizar estados
        </MyButton>
      </div>
      <div className="m-5 mt-10">
        <DenseTable
          data={formatData(data?.data)}
          tableHeader={tableHeader}
          loading={loading}
        />
        <div className="flex justify-center items-center">
          <Loader loading={loading} />
        </div>
      </div>
      {!!date && (
        <span className="text-white ml-5">{`Ultima actualización: ${date}`}</span>
      )}
    </div>
  );
}
