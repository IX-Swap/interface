import React from 'react'
import { Typography, Grid, List, ListItem } from '@material-ui/core'
import { Doughnut, Line } from 'react-chartjs-2'

// demo data
const pieData = {
  datasets: [
    {
      data: [230000, 70000],
      backgroundColor: [
		'#FF6384',
		'#36A2EB',
        ],
    hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        ]
    }
  ],
  labels: ['Cash', 'Digital Securities']
}

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Growth Over Time',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [230000, 260000, 240000, 280000, 300000]
      }
    ]
  };

export default function Overview () {
  return (
    <Grid>
      <Typography align='right' variant='h4' gutterBottom>
        <b>Total: </b>$300,000 SGD
      </Typography>
      <Grid>
        <List component='nav' aria-label='secondary mailbox folders'>
          <ListItem button>
            <b>Cash: </b> $230,000 SGD
          </ListItem>
          <ListItem button>
            <b>Digital Securities: </b> $70,000 SGD
          </ListItem>
        </List>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Doughnut data={pieData} />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Line data={lineData} />
        </Grid>
      </Grid>
    </Grid>
  )
}
