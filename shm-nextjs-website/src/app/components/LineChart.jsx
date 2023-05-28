import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function LineChart({
  options = {},
  resizable = true,
  style = {},
  className = '',
}) {
  return <CanvasJSChart options={options} />;
}
