import React from 'react'
import { LinearProgress, List, Paper } from '@material-ui/core'
import { useDeploymentMessages } from 'app/pages/issuance/hooks/useDeploymentMessages'
import { FullHeight } from 'app/components/FullHeight'
import { VariableSizeList } from 'react-window'
import { DeployTokenMessageItem } from 'app/pages/issuance/components/DeployTokenMessageItem'
import { useParams } from 'react-router-dom'

export interface DeployTokenMessagesListProps {
  isInitializing: boolean
  fixedHeight?: number
}

export const DeployTokenMessagesList = (
  props: DeployTokenMessagesListProps
) => {
  const { isInitializing, fixedHeight = 0 } = props
  const params = useParams<{ dsoId: string }>()
  const { data } = useDeploymentMessages(params.dsoId)

  const getItemSize = (index: number) => {
    // TODO Add function to get average line length for one line depends on appBreakpoint
    const averageLineLength = 150
    const linesCount = data[index].message.length / averageLineLength
    const itemSize = linesCount < 1 ? 35 : linesCount * 35
    return itemSize
  }

  if (fixedHeight > 0) {
    return (
      <Paper variant='outlined' style={{ height: fixedHeight }}>
        {isInitializing && <LinearProgress color='primary' />}
        <List style={{ padding: 0 }}>
          <VariableSizeList
            itemData={data}
            itemSize={index => getItemSize(index)}
            height={fixedHeight - 2} // 2 is a top+bottom border
            itemCount={data.length}
            width='100%'
          >
            {DeployTokenMessageItem}
          </VariableSizeList>
        </List>
      </Paper>
    )
  }

  return (
    <FullHeight>
      {(height, ref) => (
        <Paper variant='outlined' style={{ height }} ref={ref}>
          {isInitializing && <LinearProgress color='primary' />}
          <List style={{ padding: 0 }}>
            <VariableSizeList
              itemData={data}
              itemSize={index => getItemSize(index)}
              height={height - 2} // 2 is a top+bottom border
              itemCount={data.length}
              width='100%'
            >
              {DeployTokenMessageItem}
            </VariableSizeList>
          </List>
        </Paper>
      )}
    </FullHeight>
  )
}
