import React from 'react'
import {
  Box,
  CircularProgress,
  Grid,
  GridProps,
  Typography
} from '@material-ui/core'

export interface LoadingIndicatorProps extends GridProps {
  size?: number
  message?: string
}

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const { size = 40, message, ...rest } = props

  return (
    <Grid
      {...rest}
      container
      alignItems='center'
      justify='center'
      direction='column'
      style={{
        opacity: 0.75,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white'
      }}
    >
      <CircularProgress size={size} />
      {message !== undefined && (
        <Box my={1}>
          <Typography>{message}</Typography>
        </Box>
      )}
    </Grid>
  )
}
