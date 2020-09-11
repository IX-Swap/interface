import React, { PropsWithChildren, useState } from 'react'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  column: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionHeader: {
    fontWeight: 'bold'
  }
}))

interface IdentitySectionProps {
  title: string
  subtitle?: string
  actions?: JSX.Element | null
}

export const Section = (
  props: PropsWithChildren<IdentitySectionProps>
): JSX.Element => {
  const { title, subtitle, children, actions = null } = props
  const classes = useStyles()
  const [expanded, setExpanded] = useState(true)
  const toggleExpanded = (): void => {
    setExpanded(!expanded)
  }

  return (
    <Accordion expanded={expanded} onChange={toggleExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container justify='space-between'>
          <Grid item>
            <Typography variant='h6' className={classes.sectionHeader}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h6' className={classes.sectionHeader}>
              {subtitle}
            </Typography>
          </Grid>
          <Grid item>{actions}</Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>{children}</Grid>
      </AccordionDetails>
    </Accordion>
  )
}
