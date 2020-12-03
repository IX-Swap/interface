import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { truncateString } from 'app/components/DSO/utils'
import { DSOCardContent } from 'app/components/DSO/components/DSOCard/DSOCardContent'
import { DSOCardCover } from 'app/components/DSO/components/DSOCard/DSOCardCover'
import useStyles from './DSOCard.styles'

export interface DSOCardProps {
  dso: DigitalSecurityOffering
  viewURL: string
}
export const DSOCard = (props: DSOCardProps) => {
  const { dso, viewURL } = props
  const classes = useStyles()

  const capitalStructure = truncateString(dso.capitalStructure, 10)

  return (
    <Box px={2}>
      <Card className={classes.root} variant='outlined' elevation={0}>
        <DSOCardCover dso={dso} viewURL={viewURL} />
        <CardContent className={classes.content}>
          <DSOCardContent dso={dso} />
        </CardContent>
        <Typography className={classes.capitalStructure}>
          {capitalStructure}
        </Typography>
      </Card>
    </Box>
  )
}
