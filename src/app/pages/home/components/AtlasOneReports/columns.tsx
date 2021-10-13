import React from 'react'
import { Box, Card } from '@material-ui/core'
import { TableColumn } from 'types/util'
import {
  AtlasOneReportRow,
  Report
} from 'app/pages/home/components/AtlasOneReports/AtlasOneReportRow'

export const columns: Array<TableColumn<Report>> = [
  {
    label: '',
    key: 'label',
    render: (value, row) => (
      <Box style={{ backgroundColor: '#fff', paddingBottom: 15 }}>
        <Card
          variant='outlined'
          style={{
            height: 88,
            alignItems: 'center',
            display: 'flex',
            padding: '0 30px'
          }}
        >
          <AtlasOneReportRow item={row} />
        </Card>
      </Box>
    )
  }
]
