import React from 'react'
import { LinearProgress, List, Paper } from '@material-ui/core'
import { useDeploymentMessages } from 'app/pages/issuance/hooks/useDeploymentMessages'
import { FullHeight } from 'app/components/FullHeight'
import { FixedSizeList } from 'react-window'
import { DeployTokenMessageItem } from 'app/pages/issuance/components/DeployTokenMessageItem'
import { useParams } from 'react-router-dom'

export interface DeployTokenMessagesListProps {
  isInitializing: boolean
}

export const DeployTokenMessagesList = (
  props: DeployTokenMessagesListProps
) => {
  const { isInitializing } = props
  const params = useParams<{ dsoId: string }>()
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
