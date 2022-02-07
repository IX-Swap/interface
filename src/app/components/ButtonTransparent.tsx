import * as React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { Theme } from '@mui/material'
import { withStyles } from '@mui/styles'

const styles: (theme: Theme) => any = theme => {
  return {
    root: {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
      paddingLeft: 20,
      paddingRight: 20,
      boxShadow: `inset 0px 0px 0px 1px ${theme.palette.primary.main}`,
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: `inset 0px 0px 0px 1px ${theme.palette.primary.dark}`,
        color: theme.palette.primary.dark
      },
      '&:disabled': {
        backgroundColor: 'transparent',
        boxShadow: `inset 0px 0px 0px 1px ${theme.palette.grey[500]}`,
        color: theme.palette.grey[500]
      }
    }
  }
}

export const ButtonTransparent = withStyles(styles)((props: ButtonProps) => {
  const { ...rest } = props
  const classes = props.classes ?? {}

  return <Button {...rest} className={`${classes.root ?? ''}`} />
})
