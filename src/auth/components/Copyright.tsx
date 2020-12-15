import React from 'react'
import { Typography } from '@material-ui/core'

import useStyles from '../styles'

export const Copyright: React.FC = () => {
  const classes = useStyles()

  return (
    <Typography color='primary' className={classes.copyright}>
      © 2020 InvestaX, All rights reserved.
    </Typography>
  )
}
