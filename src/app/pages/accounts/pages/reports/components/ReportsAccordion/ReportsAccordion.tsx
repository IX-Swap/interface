import React, { ReactElement, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core'
import { useStyles } from './ReportsAccordion.styles'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

export interface ReportsAccordionProps {
  summary: string
  children: ReactElement
}

export const ReportsAccordion = ({
  summary,
  children
}: ReportsAccordionProps) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <Accordion
      expanded={isOpen}
      onChange={() => setIsOpen(!isOpen)}
      classes={{ root: classes.root }}
    >
      <AccordionSummary
        classes={{
          root: classes.summaryWrapper,
          content: classes.summaryContent
        }}
        expandIcon={<KeyboardArrowDownIcon color={'primary'} />}
      >
        <Typography color={'primary'} className={classes.summary}>
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.detailsWrapper }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
