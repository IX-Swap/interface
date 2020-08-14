import React from 'react'
import { Typography } from '@material-ui/core'

import useStyles from '../styles'

const Copyright = () => {
  const classes = useStyles()

  return (
    <Typography color='primary' className={classes.copyright}>
      © 2020 InvestaX, All rights reserved.
    </Typography>
  )
}

export default Copyright
