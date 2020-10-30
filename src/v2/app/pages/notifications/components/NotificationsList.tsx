import React, { forwardRef } from 'react'
import { Grid, List } from '@material-ui/core'
import { NotificationsItem } from 'v2/app/pages/notifications/components/NotificationsItem'
import { FixedSizeList } from 'react-window'
import { useNotifications } from 'v2/app/pages/notifications/hooks/useNotifications'
import { NoData } from 'v2/app/components/NoData/NoData'
import { LoadingIndicator } from 'v2/app/components/LoadingIndicator/LoadingIndicator'

export interface NotificationsListProps {
  filter?: boolean
  height?: number
  width?: number
}

export const ITEM_SIZE = 75

export const NotificationsList = forwardRef(
  (props: NotificationsListProps, ref: React.Ref<any>) => {
    const { filter = false, height = 300, width = '100%' } = props
    const { data, isLoading } = useNotifications(filter)
    const hasData = data.length > 0

    if (isLoading) {
      return <LoadingIndicator />
    }

    if (!hasData) {
      return <NoData style={{ height }} />
    }

    return (
      <Grid ref={ref}>
        <List disablePadding>
          <FixedSizeList
            itemData={data}
            itemSize={ITEM_SIZE}
            height={height}
            itemCount={data.length}
            width={width}
          >
            {NotificationsItem}
          </FixedSizeList>
        </List>
      </Grid>
    )
  }
)
