import React from "react";
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, Text } from "recharts";
import styled from "styled-components";

interface DataPoint {
  year: number;
  value: number;
}

const data: DataPoint[] = [];
const launchDate = 2004;

const rand = 300;
for (let i = 0; i < 7; i++) {
  const year = 2000 + i;
  const value = Math.random() * (rand + 50) + 100;
  let d: DataPoint = {
    year: year,
    value: value
  };
  data.push(d);
}

const type = "monotone";

const percentage = 100 - ((7 - 4 - 1) / (7 - 1)) * 100;

const DetailsChart: React.FC = () => (
  <ChartContainer>
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#AFAFCD" />
          <stop offset={`${percentage}%`} stopColor="#AFAFCD" />
          <stop offset={`${percentage}%`} stopColor="#6666FF" />
          <stop offset="100%" stopColor="#6666FF" />
        </linearGradient>
      </defs>
      <Tooltip />
      <Line type={type} dataKey="value" strokeWidth={2} stroke="url(#gradient)" dot={false} />
      <XAxis dataKey="year" tick={{ fontSize: 14 }} axisLine={false} />
      <YAxis tick={{ fontSize: 14 }} tickFormatter={(value) => `$${value}`} axisLine={false} />
      <ReferenceLine
        x={launchDate}
        label={
            <g transform="translate(570, 30)">
            <circle cx={0} cy={0} r={5} fill="#BDBDDB" />
            <Text fontSize={'14px'}  x={10} y={5}>Historical Price</Text>
          </g>
        }
      />
      <ReferenceLine
        x={launchDate}
        y={rand}
        label={
          <g transform="translate(700, 30)">
            <circle cx={0} cy={0} r={5} fill="#6666FF" />
            <Text fontSize={'14px'} x={10} y={5}>Future Price</Text>
          </g>
        }
      />
    </LineChart>
  </ChartContainer>
);

export default DetailsChart;

const ChartContainer = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #e6e6ff;
  padding: 24px;
  margin-bottom: 30px;
`;
