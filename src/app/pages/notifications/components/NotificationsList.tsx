import React from 'react'
import { Grid, List } from '@mui/material'
import { useNotifications } from 'app/pages/notifications/hooks/useNotifications'
import { NoData } from 'app/components/NoData/NoData'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
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
          <div key={index} style={{ marginBottom: 10 }}>
            <NotificationView
              data={item}
              action={<MarkAsRead data={item} />}
              trimComment={false}
            />
          </div>
        ))}
      </List>
    </Grid>
  )
}
