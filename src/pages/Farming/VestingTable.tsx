import React from 'react'

export const VestingTable = () => {
  const data = {
    labels: ['MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: 'Dataset',
        data: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
        fill: false,
        stepped: true,
      },
    ],
  }
  return <div></div>
}
