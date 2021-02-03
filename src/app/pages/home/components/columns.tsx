import React from 'react'
import { Card } from '@material-ui/core'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DataroomFile } from 'types/dataroomFile'
import { TableColumn } from 'types/util'
import { DataroomEditRow } from 'components/dataroom/DataroomEditRow'
import { AccessReportActions } from 'app/pages/home/components/AccessReportActions'

export const getAccessReportsColumns = (
  editable = false
): Array<TableColumn<DataroomFile>> => [
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
        {editable ? (
          <DataroomEditRow
            title='Access Report'
            document={row}
            actions={<AccessReportActions document={row} />}
          />
        ) : (
          <DataroomViewRow
            title='Access Report'
            document={row}
            showDivider={false}
          />
        )}
      </Card>
    )
  }
]
