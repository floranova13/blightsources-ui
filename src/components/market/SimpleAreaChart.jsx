import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const SimpleAreaChart = ({ data, width, height }) => {
  const [prices, setPrices] = useState(data);

  useEffect(() => {
    setPrices(data);
  }, [data]);

  return (
    <div key={data.length} className='text-center inline' width={width} height={height}>
      <AreaChart
        className='m-auto'
        width={width}
        height={height}
        data={prices}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' tick={false} />
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='coins' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    </div>
  );
};

export default SimpleAreaChart;
