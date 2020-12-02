import React from 'react'
import useStyles from './NavButton.styles'

export const DSOCarouselNavButton = (props: any) => {
  const { position, ...rest } = props
  const classes = useStyles({ position })()

  return <span className={classes.root} {...rest} />
}
