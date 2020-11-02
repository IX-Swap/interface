import React from 'react'
import { Grid, List } from '@material-ui/core'
import { useNotifications } from 'v2/app/pages/notifications/hooks/useNotifications'
import { NoData } from 'v2/app/components/NoData/NoData'
import { LoadingIndicator } from 'v2/app/components/LoadingIndicator/LoadingIndicator'
import { NotificationView } from './NotificationView'
import { MarkAsRead } from './MarkAsRead'

export const NotificationsList = () => {
  const { data, isLoading } = useNotifications(true)
  const hasData = data.length > 0

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (!hasData) {
    return <NoData />
  }

  return (
    <Grid>
      <List disablePadding component='div'>
        {data.map((item, index) => (
          <div style={{ marginBottom: 10 }}>
            <NotificationView
              data={item}
              action={<MarkAsRead data={item} />}
              key={index}
              trimComment={false}
            />
          </div>
        ))}
      </List>
    </Grid>
  )
}
