import React from 'react'
import { Card } from '@material-ui/core'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { TableView } from 'components/TableWithPagination/TableView'
import { emptyFile } from '__fixtures__/file'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'

export const AccessReports = () => {
  return (
    <TableView
      name={homeQueryKeys.getAccessReports}
      uri={homeURL.getAccessReports}
      paperProps={{
        variant: 'elevation',
        elevation: 0
      }}
      bordered={false}
      columns={[
        {
          label: '',
          key: 'label',
          render: () => (
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
                document={emptyFile}
                showDivider={false}
              />
            </Card>
          )
        }
      ]}
    />
  )
}
