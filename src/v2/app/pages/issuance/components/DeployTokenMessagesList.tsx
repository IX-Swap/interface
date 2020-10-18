import React from 'react'
import { LinearProgress, List, Paper } from '@material-ui/core'
import { useDeploymentMessages } from 'v2/app/pages/issuance/hooks/useDeploymentMessages'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { FullHeight } from 'v2/app/components/FullHeight'
import { FixedSizeList } from 'react-window'
import { DeployTokenMessageItem } from 'v2/app/pages/issuance/components/DeployTokenMessageItem'

export interface DeployTokenMessagesListProps {
  isInitializing: boolean
}

export const DeployTokenMessagesList = (
  props: DeployTokenMessagesListProps
) => {
  const { isInitializing } = props
  const { params } = useIssuanceRouter()
  const { data } = useDeploymentMessages(params.dsoId)

  return (
    <FullHeight>
      {(height, ref) => (
        <Paper variant='outlined' style={{ height }} ref={ref}>
          {isInitializing && <LinearProgress color='primary' />}
          <List style={{ padding: 0 }}>
            <FixedSizeList
              itemData={data}
              itemSize={35}
              height={height - 2} // 2 is a top+bottom border
              itemCount={data.length}
              width='100%'
            >
              {DeployTokenMessageItem}
            </FixedSizeList>
          </List>
        </Paper>
      )}
    </FullHeight>
  )
}
