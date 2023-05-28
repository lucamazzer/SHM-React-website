'use client';

import React from 'react';
import { Button, TextField } from '@mui/material';

import { getGraphData } from '@/Services/graphics';

import LineChart from '../components/LineChart';
import MySelect from '../components/MySelect';

const tiposGraphicos = {
  accelerationX: 'Aceleracion en X',
  accelerationY: 'Aceleracion en Y',
  accelerationZ: 'Aceleracion en Z',
  //  acceleration: 'Aceleracion todos los ejes',
  gyroscopeX: 'Giroscopio en X',
  gyroscopeY: 'Giroscopio en Y',
  gyroscopeZ: 'Giroscopio en Z',
  // giroscopio: 'Giroscopio todos los ejes',
  temperatura: 'Temperatura',
  // correlacionx: 'Correlacion en X',
  // correlaciony: 'Correlacion en Y',
  // correlacionz: 'Correlacion en Z',
  // correlacion: 'Correlacion todos los ejes',
};

const graphicOptions = Object.keys(tiposGraphicos).map(key => ({
  value: key,
  label: tiposGraphicos[key],
}));

export default function GraphicsPage() {
  const [data, setData] = React.useState(null);
  const [nMeasure, setNmeasure] = React.useState(1);
  const handleSetnMeasure = event => {
    const newValue = event.target.value < 1 ? 1 : event.target.value;
    setNmeasure(newValue);
  };

  const [graphOpt, setGraphOpt] = React.useState(graphicOptions[0].value);
  const handleChange = event => {
    setGraphOpt(event.target.value);
  };
  const formatData = d => {
    /* 
    { 
      accelerationX: '1.552490234375',
      accelerationY: '0.963623046875',
      accelerationZ: '-0.207275390625',
      gyroscopeX: '-1.786259541984733',
      gyroscopeY: '2.8244274809160306',
      gyroscopeZ: '-8.793893129770993',
      Temperature: '36.906470588235294'
    }
    */
    const newData = d?.map((item, index) => ({
      x: index / 1000,
      y: Number(item[`${graphOpt}`]),
    }));
    return [
      { type: 'line', dataPoints: newData },
      // { type: 'line', dataPoints: newData2 },
    ];
  };
  const handleGetGraphicsData = async () => {
    const response = await getGraphData();

    if (response.error) {
      console.log(response.error);
      return;
    }
    setData(formatData(response.data.data));
  };

  const options = {
    zoomEnabled: true,
    theme: 'dark2',
    animationEnabled: true,
    title: {
      text: 'Acelaracion en X',
    },
    data, // random data
  };
  return (
    <div>
      <h1>Graphics page</h1>
      <div className="flex flex-col p-5">
        <TextField
          type="number"
          id="id-medicion"
          label="Nombre de la medicion"
          variant="outlined"
          required
          className="bg-white"
          value={nMeasure}
          onChange={handleSetnMeasure}
        />
        <MySelect
          options={graphicOptions}
          title={'Qué tipo de grafico desea?'}
          label={'Graficar'}
          className="mt-15"
          value={graphOpt}
          onChange={handleChange}
        />
        <Button onClick={handleGetGraphicsData}>get data</Button>
      </div>

      {data?.length > 0 && <LineChart options={options} />}
    </div>
  );
}
