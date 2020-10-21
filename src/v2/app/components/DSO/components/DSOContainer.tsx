import React from 'react'
import {
  Grid,
  CardContent,
  Card,
  GridProps,
  Typography
} from '@material-ui/core'

export interface DSOContainerProps extends GridProps {
  children: React.ReactNode
  title?: string
}

export const DSOContainer = (props: DSOContainerProps) => {
  const { title, children, ...rest } = props

  return (
    <Grid {...rest}>
      <Card variant='outlined' style={{ height: '100%' }}>
        <CardContent>
          <Grid container direction='column' spacing={2}>
            {title !== undefined && (
              <Grid item>
                <Typography variant='h5'>{title}</Typography>
              </Grid>
            )}

            <Grid item>{children}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
