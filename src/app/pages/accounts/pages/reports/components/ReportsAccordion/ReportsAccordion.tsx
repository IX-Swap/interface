import React, { ReactElement } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core'
import { useStyles } from './ReportsAccordion.styles'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export interface ReportsAccordionProps {
  summary: string
  children: ReactElement
}

export const ReportsAccordion = ({
  summary,
  children
}: ReportsAccordionProps) => {
  const classes = useStyles()

  const { getFilterValue, updateFilter } = useQueryFilter()
  const expandedSectionsValues = getFilterValue('expandedSections') ?? ''
  const hasExpanded = expandedSectionsValues?.includes(summary)

  const handleChange = () =>
    updateFilter(
      'expandedSections',
      hasExpanded
        ? expandedSectionsValues?.replace(summary, '')
        : expandedSectionsValues?.concat(summary)
    )

  return (
    <Accordion
      expanded={expandedSectionsValues !== undefined && hasExpanded}
      onChange={handleChange}
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
