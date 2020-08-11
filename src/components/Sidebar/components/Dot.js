//
import React from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import classnames from 'classnames'

// styles
const useStyles = makeStyles(theme => ({
  dotBase: {
    width: 0,
    height: 0,
    backgroundColor: theme.palette.text.hint,
    borderRadius: '50%',
    transition: theme.transitions.create('background-color')
  }
}))

export default function Dot ({ color }) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div
      className={classnames(classes.dotBase)}
      style={{
        backgroundColor:
          color && theme.palette[color] && theme.palette[color].main
      }}
    />
  )
}
