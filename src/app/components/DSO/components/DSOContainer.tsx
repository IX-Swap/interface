import React from 'react'
import {
  Grid,
  CardContent,
  Card,
  GridProps,
  Typography,
  Box
} from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from 'app/components/DSO/components/DSOContainer.styles'

export interface DSOContainerProps extends GridProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export const DSOContainer = (props: DSOContainerProps) => {
  const { title, children, subtitle, ...rest } = props
  const classes = useStyles()

  return (
    <Grid {...rest}>
      {title !== undefined && (
        <Grid item>
          <Typography variant='h5'>{title}</Typography>
          <Box component='span' mt={1}>
            <Typography className={classes.subtitle} variant='caption'>
              {subtitle}
            </Typography>
          </Box>
          <VSpacer size='small' />
        </Grid>
      )}
      <Card variant='outlined' style={{ height: '100%' }}>
        <CardContent>
          <Grid container direction='column' spacing={2}>
            <Grid item>{children}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
