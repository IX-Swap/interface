import React from 'react'
import { Typography, Grid, ListItem } from '@material-ui/core'
import { DeclarationTemplate } from 'v2/types/identity'
import useStyles from 'v2/app/pages/identity/components/DeclarationItem.styles'

export interface DeclarationFooterProps {
  footer: Exclude<DeclarationTemplate['footer'], undefined>
  classes: ReturnType<typeof useStyles>
}

export const DeclarationFooter = ({
  footer,
  classes
}: DeclarationFooterProps) => {
  if (typeof footer === 'string') {
    return (
      <ListItem>
        <Grid container alignItems='center' spacing={1}>
          <Grid item xs={10}>
            <Typography className={classes.subLevel}>
              <span dangerouslySetInnerHTML={{ __html: footer }} />
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    )
  }
  return (
    <React.Fragment>
      {footer.map(text => (
        <ListItem key={text}>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs={10}>
              <Typography className={classes.subLevel}>
                <span dangerouslySetInnerHTML={{ __html: text }} />
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </React.Fragment>
  )
}
