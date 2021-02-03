import React from 'react'
import { Card } from '@material-ui/core'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DataroomFile } from 'types/dataroomFile'
import { TableColumn } from 'types/util'

export const columns: Array<TableColumn<DataroomFile>> = [
  {
    label: '',
    key: 'label',
    render: (value, row) => (
      <Card
        variant='outlined'
        style={{
          height: 88,
          marginBottom: 15,
          alignItems: 'center',
          display: 'flex',
          padding: '0 30px'
        }}
      >
        <DataroomViewRow
          title='Access Report'
          document={row}
          showDivider={false}
        />
      </Card>
    )
  }
]
