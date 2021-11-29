import React from 'react'
import { Box, Card } from '@material-ui/core'
import { TableColumn } from 'types/util'
import {
  ReportRow,
  Report
} from 'app/pages/educationCentre/components/AccessReports/ReportRow'

export const columns: Array<TableColumn<Report>> = [
  {
    label: '',
    key: 'label',
    render: (value, row) => (
      <Box style={{ backgroundColor: '#fff', paddingBottom: 15 }}>
        <Card
          variant='outlined'
          style={{
            minHeight: 88,
            alignItems: 'center',
            display: 'flex',
            padding: '10px 30px'
          }}
        >
          <ReportRow item={row} />
        </Card>
      </Box>
    )
  }
]
