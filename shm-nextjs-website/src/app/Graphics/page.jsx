'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Button, FormControlLabel, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers';
import classNames from 'classnames';
import moment from 'moment';
import dynamic from 'next/dynamic';

import { getGraphData } from '@/Services/graphics';

import Loader from '../components/Loader';
import MySelect from '../components/MySelect';

const LineChart = dynamic(() => import('../components/LineChart'), {
  ssr: false,
});

const tiposGraphicos = {
  accelerationX: 'Aceleracion en X',
  accelerationY: 'Aceleracion en Y',
  accelerationZ: 'Aceleracion en Z',
  //  acceleration: 'Aceleracion todos los ejes',
  gyroscopeX: 'Giroscopio en X',
  gyroscopeY: 'Giroscopio en Y',
  gyroscopeZ: 'Giroscopio en Z',
  // giroscopio: 'Giroscopio todos los ejes',
  temperature: 'Temperatura',
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
  const [dataToShow, setDataToShow] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const [nodesToShow, setNodesToShow] = React.useState({});

  const [day, setDay] = React.useState(moment());
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
    [
      {
        name: 'nombre nodo1', // 9d9s8d399s8
        data: [
          {
            accelerationX: '1.552490234375',
            accelerationY: '0.963623046875',
            accelerationZ: '-0.207275390625',
            gyroscopeX: '-1.786259541984733',
            gyroscopeY: '2.8244274809160306',
            gyroscopeZ: '-8.793893129770993',
            Temperature: '36.906470588235294'
          }
          ....
        ]
      },
       {
        name: 'nombre nodo2', // 9asfd921ds
        data: [
          {
            accelerationX: '1.552490234375',
            accelerationY: '0.963623046875',
            accelerationZ: '-0.207275390625',
            gyroscopeX: '-1.786259541984733',
            gyroscopeY: '2.8244274809160306',
            gyroscopeZ: '-8.793893129770993',
            Temperature: '36.906470588235294'
          }
          ....
        ]
      }
    ]
 */

    const nodesNames = d?.map(item => item.name);
    const nodesToshowobj = {};
    nodesNames.forEach(name => {
      nodesToshowobj[name] = true;
    });
    setNodesToShow(nodesToshowobj);
    const nodesData = [];

    nodesNames.forEach(name => {
      const nodeData = d?.find(item => item.name === name);
      const reducedData = nodeData?.data?.slice(0, 3000);
      const formatedData = reducedData?.map((item, index) => ({
        x: index / reducedData?.length,
        y: Number(item[`${graphOpt}`]),
      }));

      nodesData.push({
        type: 'line',
        dataPoints: formatedData,
        name,
        showInLegend: true,
      });
    });

    return nodesData;
  };

  const handleGetGraphicsData = async () => {
    const id = `${moment(day).format('YYYYMMDD')}-${('00' + nMeasure).slice(
      -3,
    )}`;

    setLoading(true);
    const response = await getGraphData(id);

    if (response.error) {
      setLoading(false);
      toast.error(response.error.message);

      return;
    }
    const dataFormatted = formatData(response.data.data);
    setData(dataFormatted);
    setDataToShow(dataFormatted);
    setLoading(false);
  };

  const options = useMemo(
    () => ({
      zoomEnabled: true,
      theme: 'dark2',
      animationEnabled: true,
      title: {
        text: tiposGraphicos[graphOpt],
      },
      axisX: {
        gridThickness: 0,
        title: 'Tiempo (m)',
        titleFontColor: 'white',
        labelFontColor: 'white',
      },
      data: dataToShow,
    }),
    [dataToShow],
  );

  useEffect(() => {
    if (data) {
      handleGetGraphicsData();
    }
  }, [graphOpt]);

  const handleCheck = useCallback(
    (name, checked) => {
      const newNodesToShow = { ...nodesToShow, [name]: checked };
      setNodesToShow(newNodesToShow);
      const newDataToShow = data?.filter(item => newNodesToShow[item.name]);
      setDataToShow(newDataToShow);
    },
    [nodesToShow, data],
  );

  return (
    <div className="h-full p-5 bg-gray-300 overflow-auto shrink-0">
      <h1 className="text-center text-4xl">Graficar Mediciones</h1>
      <div className="flex flex-col p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl">
        <div className="flex my-5 items-center">
          <TextField
            type="number"
            id="id-medicion"
            label="Numero de medición"
            variant="outlined"
            required
            value={nMeasure}
            onChange={handleSetnMeasure}
          />
          <div className="ml-5">
            <DatePicker
              color="primary"
              label="Fecha de la medición"
              format="DD/MM/YYYY"
              value={day}
              onChange={newValue => setDay(newValue)}
            />
          </div>
        </div>

        <MySelect
          options={graphicOptions}
          title={'Tipo de grafico'}
          color="primary"
          value={graphOpt}
          onChange={handleChange}
        />
        <Button
          onClick={handleGetGraphicsData}
          variant="contained"
          className="bg-primary hover:bg-blue-700">
          Obtener medición
        </Button>
      </div>
      <div className="flex items-center mt-10">
        <Loader loading={loading} color="primary" />
      </div>
      <div
        className={classNames(
          { hidden: !(data && data?.length > 0) || loading },
          'flex p-5 mt-5 items-center justify-center bg-gray-200 border-2 border-primary rounded-2xl item-center ',
        )}>
        <div className="flex flex-col">
          {Object.keys(nodesToShow)?.map(item => (
            <FormControlLabel
              key={item}
              label={`${item}`}
              control={
                <Checkbox
                  checked={nodesToShow[item]}
                  onChange={e => handleCheck(item, e.target.checked)}
                />
              }
            />
          ))}
        </div>
        <LineChart options={options} />
      </div>
    </div>
  );
}
