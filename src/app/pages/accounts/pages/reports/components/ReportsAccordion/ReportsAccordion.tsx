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

  return (
    <Accordion
      expanded={
        expandedSectionsValues !== undefined &&
        expandedSectionsValues?.includes(summary)
      }
      onChange={() =>
        expandedSectionsValues?.includes(summary)
          ? updateFilter(
              'expandedSections',
              expandedSectionsValues?.replace(summary, '')
            )
          : updateFilter(
              'expandedSections',
              expandedSectionsValues?.concat(summary)
            )
      }
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
