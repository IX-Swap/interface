//
import React, { useState } from 'react'

import {
  Container,
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

const IdentitySection = ({ title, subtitle, children }) => {
  const classes = useStyles()

  const [expanded, setExpanded] = useState(true)

  return (
    <Accordion
      expanded={expanded}
      onChange={() => {
        setExpanded(!expanded)
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Container className={classes.column}>
          <Typography variant='h6' className={classes.sectionHeader}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant='h6' className={classes.sectionHeader}>
              {subtitle}
            </Typography>
          )}
        </Container>
      </AccordionSummary>
      <AccordionDetails>
        <Container>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Container>
      </AccordionDetails>
    </Accordion>
  )
}

export default IdentitySection
