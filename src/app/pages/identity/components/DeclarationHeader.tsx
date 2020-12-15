import React from 'react'
import { Typography, Grid, ListItem } from '@material-ui/core'
import { DeclarationTemplate } from 'types/identity'

interface DeclarationHeaderProps {
  header: Exclude<DeclarationTemplate['header'], undefined>
}
export const DeclarationHeader = ({ header }: DeclarationHeaderProps) => (
  <ListItem>
    <Grid container alignItems='center' spacing={1}>
      <Grid item xs={10}>
        <Typography>
          <span dangerouslySetInnerHTML={{ __html: header }} />
        </Typography>
      </Grid>
    </Grid>
  </ListItem>
)
