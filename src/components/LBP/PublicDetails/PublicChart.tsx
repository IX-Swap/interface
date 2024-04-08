import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';

const data = [
  { name: '25 Apr.', pv: 2400 },
  { name: '26 Apr.', pv: 1398 },
  { name: '27 Apr.', pv: 9800 },
  { name: '28 Apr.', pv: 3908 },
  { name: '29 Apr.', pv: 4800 },
  { name: '30 Apr.', pv: 3800 },
  { name: '01 May', pv: 4300 },
];

export default function DetailsChart() {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="pv"  stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #e6e6ff;
  padding: 24px;
  margin-bottom: 30px;
`;
