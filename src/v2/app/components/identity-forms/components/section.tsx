// @flow
import React, { useState } from 'react'
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Button
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
  children?: React.ReactNode
  onDelete?: () => void
  onAdd?: () => void
}

const IdentitySection = ({
  title,
  subtitle,
  children,
  onDelete,
  onAdd
}: IdentitySectionProps) => {
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
          <Grid container justify='space-between'>
            <Grid item>
              <Typography variant='h6' className={classes.sectionHeader}>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              {subtitle && (
                <Typography variant='h6' className={classes.sectionHeader}>
                  {subtitle}
                </Typography>
              )}
              {onDelete && (
                <Button
                  color='primary'
                  onClick={e => {
                    e.stopPropagation()
                    onDelete()
                  }}
                >
                  Delete
                </Button>
              )}
              {onAdd && (
                <Button
                  color='primary'
                  onClick={e => {
                    e.stopPropagation()
                    onAdd()
                  }}
                >
                  Add
                </Button>
              )}
            </Grid>
          </Grid>
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
