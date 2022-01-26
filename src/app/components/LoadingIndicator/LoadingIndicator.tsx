import React from 'react'
import {
  CircularProgress,
  Grid,
  GridProps,
  Typography
} from '@mui/material'
import { useStyles } from 'app/components/LoadingIndicator/LoadingIndicator.styles'
import { VSpacer } from 'components/VSpacer'

export interface LoadingIndicatorProps extends GridProps {
  size?: number
  message?: string
  title?: string
  opacity?: number
}

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const { size, opacity, title, message, ...rest } = props
  const classes = useStyles()

  return (
    <Grid
      {...rest}
      container
      alignItems='center'
      justifyContent='center'
      direction='column'
      className={classes.wrapper}
      style={{
        opacity
      }}
    >
      {title !== undefined && <Typography variant='h3'>{title}</Typography>}
      <VSpacer size='small' />
      {message !== undefined && (
        <Typography align='center'>{message}</Typography>
      )}
      <VSpacer size='medium' />
      <CircularProgress size={size} />
    </Grid>
  )
}

LoadingIndicator.defaultProps = {
  size: 40,
  opacity: 0.75
}
