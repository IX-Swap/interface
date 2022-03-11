import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { DSOCardContent } from 'app/components/DSO/components/DSOCard/DSOCardContent'
import { DSOCardCover } from 'app/components/DSO/components/DSOCard/DSOCardCover'
import useStyles from 'app/components/DSO/components/DSOCard/DSOCard.styles'

export interface DSOCardProps {
  dso: DigitalSecurityOffering
  viewURL: string
}

export const DSOCard = (props: DSOCardProps) => {
  const { dso, viewURL } = props
  const classes = useStyles()

  return (
    <Box px={2} height='100%'>
      <Card className={classes.root} variant='outlined' elevation={0}>
        <DSOCardCover dso={dso} viewURL={viewURL} />
        <CardContent className={classes.content}>
          <DSOCardContent dso={dso} />
        </CardContent>
        <Typography className={classes.capitalStructure}>
          {dso.capitalStructure}
        </Typography>
      </Card>
    </Box>
  )
}
