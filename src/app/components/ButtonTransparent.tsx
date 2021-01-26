import * as React from 'react'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { Theme } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles: (theme: Theme) => any = theme => {
  return {
    root: {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: theme.palette.primary.dark,
        color: theme.palette.primary.dark
      },
      '&:disabled': {
        backgroundColor: 'transparent',
        borderColor: theme.palette.primary.light,
        color: theme.palette.primary.light
      }
    }
  }
}

export const ButtonTransparent = withStyles(styles)((props: ButtonProps) => {
  const { ...rest } = props
  const classes = props.classes ?? {}

  return <Button {...rest} className={`${classes.root ?? ''}`} />
})
