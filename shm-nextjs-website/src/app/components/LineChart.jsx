import React from 'react';
import dynamic from 'next/dynamic';
const CanvasJSReact = dynamic(() => import('@canvasjs/react-charts'), {
  ssr: false,
});
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function LineChart({
  options = {},
  resizable = true,
  style = {},
  className = '',
}) {
  return <CanvasJSChart options={options} />;
}
