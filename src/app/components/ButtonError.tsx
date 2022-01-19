import * as React from 'react'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { Theme } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { themeColors } from 'themes/old/colors'
import tinycolor from 'tinycolor2'

const styles: (theme: Theme) => any = theme => {
  return {
    root: {
      backgroundColor: themeColors.error,
      color: theme.palette.error.contrastText,
      '&:hover': {
        backgroundColor: tinycolor(themeColors.error).darken(10).toHexString()
      },
      '&:disabled': {
        backgroundColor: theme.palette.error.light
      }
    }
  }
}

export const ButtonError = withStyles(styles)((props: ButtonProps) => {
  const { ...rest } = props
  const classes = props.classes ?? {}

  return <Button {...rest} className={`${classes.root ?? ''}`} />
})
